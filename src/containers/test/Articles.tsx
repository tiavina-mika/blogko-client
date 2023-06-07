import { Stack, Button, styled, Typography } from '@mui/material';
import { createArticle, deleteAllArticles, deleteArticle, getArticle, getArticles, updateArticle } from '../../actions/articles';

// const StyledContainer = styled(Box)(({ theme }) => ({
//   padding: 12,
//   display: 'flex',
//   justifyContent: 'center',
//   backgroundColor: theme.palette.primary.main
// }));

const id = 'r6EZDbqIiS';


const StyledButton = styled(Button)({
  width: '18vw'
});

const Article = () => {
  const handleArticleCreation = async () => {
    const values = {
      title: 'Article 1',
    }
    await createArticle(values as any)
  }

  const handleArticleEdition = async () => {
    const values = {
      title: 'Article 1 mod',
    }
    await updateArticle(id, values as any)
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
    <Stack spacing={2}>
      <Typography variant="h5">
        Article
      </Typography>
      <StyledButton variant="contained" color="primary" onClick={handleArticleCreation}>Create Article</StyledButton>
      <StyledButton variant="contained" color="primary" onClick={handleArticleEdition}>Update Article</StyledButton>
      <StyledButton variant="contained" color="primary" onClick={handleArticleDeletion}>Delete Article</StyledButton>
      <StyledButton variant="contained" color="primary" onClick={handleArticlesLoad}>Get Articles</StyledButton>
      <StyledButton variant="contained" color="primary" onClick={handleArticleLoad}>Get Article</StyledButton>
      <StyledButton variant="contained" color="primary" onClick={handleDeleteAllArticles}>Delete all articles</StyledButton>
    </Stack>
  );
}

export default Article;
