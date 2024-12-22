import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { categoryService } from '../../services/categoryService';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { OptimizedImage } from '../../components/common/OptimizedImage';

const CategoriesContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const SearchBar = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  input {
    width: 100%;
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.medium};
    font-size: ${props => props.theme.typography.body};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: ${props => props.theme.shadows.soft};
    }
  }
`;

const CategoryList = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.isDragging ? props.theme.colors.backgroundAlt : 'white'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  padding: ${props => props.theme.spacing.xs};
  margin-right: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
`;

const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  img {
    width: 50px;
    height: 50px;
    border-radius: ${props => props.theme.borderRadius.medium};
    object-fit: cover;
  }
`;

const CategoryDetails = styled.div`
  flex: 1;
  
  h3 {
    margin: 0;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9em;
  }
`;

const CategoryStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-right: ${props => props.theme.spacing.lg};
  
  span {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9em;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  width: 100%;
  max-width: 600px;
  
  h2 {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
  
  label {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  
  input, textarea, select {
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.medium};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.xs};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: white;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  
  ${props => props.primary ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  ` : `
    background: ${props.theme.colors.backgroundAlt};
    color: ${props.theme.colors.text};
    
    &:hover {
      background: ${props.theme.colors.border};
    }
  `}
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Categories = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent: '',
    icon: '',
    isActive: true,
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories({
        format: 'tree',
        withStats: true
      });
      setCategories(data);
    } catch (error) {
      showToast('Erreur lors du chargement des catégories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        parent: category.parent || '',
        icon: category.icon || '',
        isActive: category.isActive,
        seo: {
          title: category.seo?.title || '',
          description: category.seo?.description || '',
          keywords: category.seo?.keywords || []
        }
      });
      setImagePreview(category.image?.url);
      setEditingCategory(category);
    } else {
      setFormData({
        name: '',
        description: '',
        parent: '',
        icon: '',
        isActive: true,
        seo: {
          title: '',
          description: '',
          keywords: []
        }
      });
      setImagePreview(null);
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      parent: '',
      icon: '',
      isActive: true,
      seo: {
        title: '',
        description: '',
        keywords: []
      }
    });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'seo') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (e.target.image.files[0]) {
        formDataToSend.append('image', e.target.image.files[0]);
      }

      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formDataToSend);
        showToast('Catégorie mise à jour avec succès', 'success');
      } else {
        await categoryService.createCategory(formDataToSend);
        showToast('Catégorie créée avec succès', 'success');
      }

      handleCloseModal();
      loadCategories();
    } catch (error) {
      showToast('Erreur lors de la sauvegarde de la catégorie', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await categoryService.deleteCategory(categoryId);
        showToast('Catégorie supprimée avec succès', 'success');
        loadCategories();
      } catch (error) {
        showToast('Erreur lors de la suppression de la catégorie', 'error');
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);

    try {
      await categoryService.updateOrder(
        items.map((item, index) => ({
          _id: item._id,
          displayOrder: index
        }))
      );
    } catch (error) {
      showToast('Erreur lors de la mise à jour de l\'ordre', 'error');
      loadCategories();
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CategoriesContainer>
      <Header>
        <Title>Gestion des catégories</Title>
        <AddButton onClick={() => handleOpenModal()}>
          ➕ Nouvelle catégorie
        </AddButton>
      </Header>

      <SearchBar>
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <CategoryList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredCategories.map((category, index) => (
                <Draggable
                  key={category._id}
                  draggableId={category._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <CategoryItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isDragging={snapshot.isDragging}
                    >
                      <DragHandle {...provided.dragHandleProps}>
                        ⋮
                      </DragHandle>
                      <CategoryInfo>
                        {category.image?.url ? (
                          <OptimizedImage
                            src={category.image.url}
                            alt={category.name}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div>{category.icon || '📦'}</div>
                        )}
                        <CategoryDetails>
                          <h3>{category.name}</h3>
                          <p>{category.description}</p>
                        </CategoryDetails>
                      </CategoryInfo>
                      <CategoryStats>
                        <span>📦 {category.stats.productCount} produits</span>
                        <span>💰 {category.stats.totalSales} ventes</span>
                      </CategoryStats>
                      <Actions>
                        <ActionButton onClick={() => handleOpenModal(category)}>
                          ✏️
                        </ActionButton>
                        <ActionButton onClick={() => handleDelete(category._id)}>
                          🗑️
                        </ActionButton>
                      </Actions>
                    </CategoryItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </CategoryList>
          )}
        </Droppable>
      </DragDropContext>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>
              {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Nom de la catégorie</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Catégorie parente</label>
                <select
                  name="parent"
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                >
                  <option value="">Aucune</option>
                  {categories
                    .filter(cat => cat._id !== editingCategory?._id)
                    .map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </FormGroup>

              <FormGroup>
                <label>Icône (emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  maxLength="10"
                />
              </FormGroup>

              <FormGroup>
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <ImagePreview>
                    <img src={imagePreview} alt="Aperçu" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        const fileInput = document.querySelector('input[type="file"]');
                        if (fileInput) fileInput.value = '';
                      }}
                    >
                      ×
                    </button>
                  </ImagePreview>
                )}
              </FormGroup>

              <FormGroup>
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  {' '}Catégorie active
                </label>
              </FormGroup>

              <h3>SEO</h3>
              <FormGroup>
                <label>Titre SEO</label>
                <input
                  type="text"
                  name="seo.title"
                  value={formData.seo.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, title: e.target.value }
                  })}
                  maxLength="60"
                />
              </FormGroup>

              <FormGroup>
                <label>Description SEO</label>
                <textarea
                  name="seo.description"
                  value={formData.seo.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, description: e.target.value }
                  })}
                  maxLength="160"
                />
              </FormGroup>

              <FormGroup>
                <label>Mots-clés (séparés par des virgules)</label>
                <input
                  type="text"
                  name="seo.keywords"
                  value={formData.seo.keywords.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: {
                      ...formData.seo,
                      keywords: e.target.value.split(',').map(k => k.trim())
                    }
                  })}
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button type="submit" primary disabled={isSubmitting}>
                  {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </CategoriesContainer>
  );
}; 