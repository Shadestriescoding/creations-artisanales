const Product = require('../models/Product');
const { validateProduct } = require('../validators/productValidator');
const { uploadImage, deleteImage } = require('../services/imageService');

exports.createProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Gérer les images
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadImage(file);
        images.push({
          url: imageUrl,
          alt: req.body.name,
          isDefault: images.length === 0
        });
      }
    }

    const product = new Product({
      ...req.body,
      images
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      category,
      status,
      search,
      minPrice,
      maxPrice,
      inStock
    } = req.query;

    const query = {};

    // Filtres
    if (category) query.category = category;
    if (status) query.status = status;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (inStock === 'true') {
      query.$or = [
        { 'inventory.quantity': { $gt: 0 } },
        { 'inventory.allowBackorder': true }
      ];
    }

    // Recherche texte
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('category')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Incrémenter le compteur de vues
    product.stats.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Gérer les nouvelles images
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const imageUrl = await uploadImage(file);
        newImages.push({
          url: imageUrl,
          alt: req.body.name,
          isDefault: newImages.length === 0 && !product.images.length
        });
      }
      product.images.push(...newImages);
    }

    // Supprimer les images marquées
    if (req.body.imagesToDelete) {
      const imagesToDelete = JSON.parse(req.body.imagesToDelete);
      for (const imageId of imagesToDelete) {
        const image = product.images.id(imageId);
        if (image) {
          await deleteImage(image.url);
          product.images.pull(imageId);
        }
      }
    }

    // Mettre à jour les autres champs
    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Supprimer les images associées
    for (const image of product.images) {
      await deleteImage(image.url);
    }

    await product.remove();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { quantity, allowBackorder, lowStockThreshold } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (quantity !== undefined) product.inventory.quantity = quantity;
    if (allowBackorder !== undefined) product.inventory.allowBackorder = allowBackorder;
    if (lowStockThreshold !== undefined) product.inventory.lowStockThreshold = lowStockThreshold;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du stock:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du stock' });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.getLowStock();
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en rupture de stock:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits en rupture de stock' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Paramètre de recherche manquant' });
    }

    const products = await Product.search(q);
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de produits' });
  }
}; 