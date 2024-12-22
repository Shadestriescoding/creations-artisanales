const Category = require('../models/Category');
const Product = require('../models/Product');
const { validateCategory } = require('../validators/categoryValidator');
const { uploadImage, deleteImage } = require('../services/imageService');

exports.createCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Gérer l'image si elle est fournie
    if (req.file) {
      const imageResult = await uploadImage(req.file);
      req.body.image = {
        url: imageResult.sizes.medium.webp,
        alt: req.body.name
      };
    }

    const category = new Category(req.body);
    await category.save();

    // Si la catégorie a un parent, mettre à jour ses statistiques
    if (category.parent) {
      const parentCategory = await Category.findById(category.parent);
      if (parentCategory) {
        await parentCategory.updateStats();
      }
    }

    res.status(201).json(category);
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const {
      format = 'list',
      includeInactive = false,
      withStats = false,
      search
    } = req.query;

    let query = {};
    
    if (!includeInactive) {
      query.isActive = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    let categories;
    
    if (format === 'tree') {
      categories = await Category.getTree();
    } else {
      categories = await Category.find(query)
        .populate('parent', 'name slug')
        .sort('displayOrder name');

      if (withStats) {
        for (let category of categories) {
          await category.updateStats();
        }
      }
    }

    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parent', 'name slug')
      .populate('children', 'name slug image');

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Récupérer les produits de la catégorie
    const products = await Product.find({ category: category._id })
      .select('name slug price images stats')
      .sort('-createdAt');

    // Mettre à jour les statistiques
    await category.updateStats();

    res.json({
      category,
      products,
      breadcrumb: category.getPath()
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Vérifier les cycles dans l'arborescence
    if (req.body.parent) {
      const parent = await Category.findById(req.body.parent);
      if (!parent) {
        return res.status(400).json({ message: 'Catégorie parente invalide' });
      }
      
      if (req.body.parent === category._id.toString()) {
        return res.status(400).json({ message: 'Une catégorie ne peut pas être sa propre parente' });
      }

      const children = await Category.find({ parent: category._id });
      if (children.some(child => child._id.toString() === req.body.parent)) {
        return res.status(400).json({ message: 'Une catégorie ne peut pas avoir une de ses enfants comme parente' });
      }
    }

    // Gérer la nouvelle image si elle est fournie
    if (req.file) {
      const imageResult = await uploadImage(req.file);
      
      // Supprimer l'ancienne image
      if (category.image && category.image.url) {
        await deleteImage(category.image.url);
      }

      req.body.image = {
        url: imageResult.sizes.medium.webp,
        alt: req.body.name || category.name
      };
    }

    // Mettre à jour la catégorie
    Object.assign(category, req.body);
    await category.save();

    // Mettre à jour les statistiques du parent si nécessaire
    if (category.parent) {
      const parentCategory = await Category.findById(category.parent);
      if (parentCategory) {
        await parentCategory.updateStats();
      }
    }

    res.json(category);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Vérifier s'il y a des produits dans la catégorie
    const productsCount = await Product.countDocuments({ category: category._id });
    if (productsCount > 0) {
      return res.status(400).json({
        message: 'Impossible de supprimer une catégorie contenant des produits'
      });
    }

    // Vérifier s'il y a des sous-catégories
    const hasChildren = await Category.exists({ parent: category._id });
    if (hasChildren) {
      return res.status(400).json({
        message: 'Impossible de supprimer une catégorie ayant des sous-catégories'
      });
    }

    // Supprimer l'image associée
    if (category.image && category.image.url) {
      await deleteImage(category.image.url);
    }

    await category.remove();

    // Mettre à jour les statistiques du parent
    if (category.parent) {
      const parentCategory = await Category.findById(category.parent);
      if (parentCategory) {
        await parentCategory.updateStats();
      }
    }

    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Format invalide' });
    }

    for (const item of orders) {
      if (!item._id || typeof item.displayOrder !== 'number') {
        return res.status(400).json({ message: 'Format invalide' });
      }

      await Category.findByIdAndUpdate(item._id, {
        displayOrder: item.displayOrder
      });
    }

    res.json({ message: 'Ordre mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'ordre:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'ordre' });
  }
};

exports.searchCategories = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Paramètre de recherche manquant' });
    }

    const categories = await Category.search(q);
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la recherche de catégories:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de catégories' });
  }
}; 