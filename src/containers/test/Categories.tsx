import { Stack, Button, styled, Typography } from '@mui/material';
import { createCategory, deleteAllCategories, deleteCategory, getCategory, getCategories, updateCategory } from '../../actions/categories';


const id = 'r6EZDbqIiS';


const StyledButton = styled(Button)({
  width: '18vw'
});

const Categories = () => {
  const handleCategoryCreation = async () => {
    const values = {
      name: 'Category 1',
    }
    await createCategory(values)
  }

  const handleCategoryEdition = async () => {
    const values = {
      name: 'Category 1 mod',
    }
    await updateCategory(id, values)
  }

  const handleCategoryDeletion = async () => {

    await deleteCategory(id)
  }

  const handleCategoriesLoad= async () => {
    await getCategories()
  }

  const handleCategoryLoad = async () => {
    await getCategory(id)
  }

  const handleDeleteAllCategories = async () => {
    await deleteAllCategories()
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Category
      </Typography>
      <StyledButton variant="contained" color="secondary" onClick={handleCategoryCreation}>Create Category</StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={handleCategoryEdition}>Update Category</StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={handleCategoryDeletion}>Delete Category</StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={handleCategoriesLoad}>Get Categories</StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={handleCategoryLoad}>Get Category</StyledButton>
      <StyledButton variant="contained" color="secondary" onClick={handleDeleteAllCategories}>Delete all categories</StyledButton>
    </Stack>
  );
}

export default Categories;
