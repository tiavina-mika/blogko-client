import { Stack, Box, styled } from '@mui/material';
import Articles from './Articles';
import Categories from './Categories';


const StyledContainer = styled(Box)({
  padding: 12,
  paddingTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const Home = () => {
  return (
    <StyledContainer>
      <Stack spacing={4}>
        <Articles />
        <Categories />
      </Stack>
    </StyledContainer>
  );
}

export default Home;
