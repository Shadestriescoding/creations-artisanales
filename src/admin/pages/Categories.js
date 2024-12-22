import React, { useState } from 'react';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
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

const CategoriesTable = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: ${props => props.theme.spacing.md};
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
    }
    
    th {
      background: ${props => props.theme.colors.backgroundAlt};
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
    
    tr:hover {
      background: ${props => props.theme.colors.backgroundAlt}33;
    }
  }
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
  
  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.xs};
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
  max-width: 500px;
  
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
  
  input, textarea {
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.backgroundAlt};
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  ${props => props.primary ? `
    background: ${props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  ` : `
    background: white;
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.backgroundAlt};
    
    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

const Badge = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.85rem;
`;

export const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentCategory: ''
  });

  // Données mockées pour les catégories
  const mockCategories = [
    {
      id: 1,
      name: "Gourmandises crochetées",
      description: "Pâtisseries et sucreries en crochet",
      productsCount: 12,
      subCategories: ["Donuts", "Cupcakes"]
    },
    {
      id: 2,
      name: "Décorations saisonnières",
      description: "Articles décoratifs selon les saisons",
      productsCount: 8,
      subCategories: ["Noël", "Halloween"]
    },
    {
      id: 3,
      name: "Origami",
      description: "Créations en papier plié",
      productsCount: 5,
      subCategories: []
    }
  ];

  const handleOpenModal = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        parentCategory: ''
      });
      setEditingCategory(category);
    } else {
      setFormData({
        name: '',
        description: '',
        parentCategory: ''
      });
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
      parentCategory: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, nous ajouterons la logique pour sauvegarder la catégorie
    console.log('Saving category:', formData);
    handleCloseModal();
  };

  const handleDelete = (categoryId) => {
    // Ici, nous ajouterons la logique pour supprimer la catégorie
    console.log('Deleting category:', categoryId);
  };

  return (
    <CategoriesContainer>
      <Header>
        <h1>Gestion des catégories</h1>
        <AddButton onClick={() => handleOpenModal()}>
          ➕ Nouvelle catégorie
        </AddButton>
      </Header>

      <CategoriesTable>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Sous-catégories</th>
              <th>Produits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCategories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  {category.subCategories.map((sub, index) => (
                    <Badge key={index} style={{ marginRight: '0.5rem' }}>
                      {sub}
                    </Badge>
                  ))}
                </td>
                <td>
                  <Badge>{category.productsCount} produits</Badge>
                </td>
                <td>
                  <ActionButton onClick={() => handleOpenModal(category)}>
                    ✏️
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(category.id)}>
                    🗑️
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CategoriesTable>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Nom de la catégorie</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Gourmandises crochetées"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez cette catégorie..."
                />
              </FormGroup>

              <FormGroup>
                <label>Catégorie parente (optionnel)</label>
                <select
                  value={formData.parentCategory}
                  onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                >
                  <option value="">Aucune</option>
                  {mockCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button type="submit" primary>
                  {editingCategory ? 'Enregistrer' : 'Créer'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </CategoriesContainer>
  );
}; 