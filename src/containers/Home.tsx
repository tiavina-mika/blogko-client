import { Stack, Button, Box, styled } from '@mui/material';
import { createArticle, deleteArticle, updateArticle } from '../actions/articles';

// const StyledContainer = styled(Box)(({ theme }) => ({
//   padding: 12,
//   display: 'flex',
//   justifyContent: 'center',
//   backgroundColor: theme.palette.primary.main
// }));

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
    const id = 'WkDDfGRaTB';
    const values = {
      title: 'Article 1 mod',
    }
    await updateArticle(id, values)
  }

  const handleArticleDeletion = async () => {
    const id = 'WkDDfGRaTB';

    await deleteArticle(id)
  }

  return (
    <StyledContainer>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleArticleCreation}>Create Article</Button>
        <Button variant="contained" color="primary" onClick={handleArticleEdition}>Update Article</Button>
        <Button variant="contained" color="primary" onClick={handleArticleDeletion}>Delete Article</Button>
        <Button variant="contained" color="primary">Get Articles</Button>
        <Button variant="contained" color="primary">Get Article</Button>
      </Stack>      
    </StyledContainer>

  );
}

export default Home;
