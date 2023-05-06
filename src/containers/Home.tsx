import { Stack, Button, Box, styled } from '@mui/material';
import { createArticle, deleteAllArticles, deleteArticle, getArticle, getArticles, updateArticle } from '../actions/articles';

// const StyledContainer = styled(Box)(({ theme }) => ({
//   padding: 12,
//   display: 'flex',
//   justifyContent: 'center',
//   backgroundColor: theme.palette.primary.main
// }));

const id = 'r6EZDbqIiS';

const StyledContainer = styled(Box)({
  padding: 12,
  paddingTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const StyledButton = styled(Button)({
  width: 400
});

const Home = () => {
  const handleArticleCreation = async () => {
    const values = {
      title: 'Article 1',
    }
    await createArticle(values)
  }

  const handleArticleEdition = async () => {
    const values = {
      title: 'Article 1 mod',
    }
    await updateArticle(id, values)
  }

  const handleArticleDeletion = async () => {

    await deleteArticle(id)
  }

  const handleArticlesLoad= async () => {
    await getArticles()
  }

  const handleArticleLoad = async () => {
    await getArticle(id)
  }

  const handleDeleteAllArticles = async () => {
    await deleteAllArticles()
  }

  return (
    <StyledContainer>
      <Stack direction="column" spacing={2}>
        <StyledButton variant="contained" color="primary" onClick={handleArticleCreation}>Create Article</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleArticleEdition}>Update Article</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleArticleDeletion}>Delete Article</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleArticlesLoad}>Get Articles</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleArticleLoad}>Get Article</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleDeleteAllArticles}>Delete all articles</StyledButton>
      </Stack>      
    </StyledContainer>

  );
}

export default Home;
