import { Stack, Button, Box, styled } from '@mui/material';

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
  return (
    <StyledContainer>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">Create Article</Button>
        <Button variant="contained" color="primary">Update Article</Button>
        <Button variant="contained" color="primary">Get Articles</Button>
        <Button variant="contained" color="primary">Get Article</Button>
      </Stack>      
    </StyledContainer>

  );
}

export default Home;
