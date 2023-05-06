import { Stack, Button, Box, styled } from '@mui/material';
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle } from '../actions/articles';

// const StyledContainer = styled(Box)(({ theme }) => ({
//   padding: 12,
//   display: 'flex',
//   justifyContent: 'center',
//   backgroundColor: theme.palette.primary.main
// }));

const id = '125VZDpW04';

const StyledContainer = styled(Box)({
  padding: 12,
  display: 'flex',
  justifyContent: 'center',
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

  return (
    <StyledContainer>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleArticleCreation}>Create Article</Button>
        <Button variant="contained" color="primary" onClick={handleArticleEdition}>Update Article</Button>
        <Button variant="contained" color="primary" onClick={handleArticleDeletion}>Delete Article</Button>
        <Button variant="contained" color="primary" onClick={handleArticlesLoad}>Get Articles</Button>
        <Button variant="contained" color="primary" onClick={handleArticleLoad}>Get Article</Button>
      </Stack>      
    </StyledContainer>

  );
}

export default Home;
