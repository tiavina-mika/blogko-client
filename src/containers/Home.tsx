import { Stack, styled, Container } from '@mui/material';
import Articles from './Articles';
import Categories from './Categories';
import Auth from './Auth';
import Settings from './Settings';

const StyledContainer = styled(Container)({
  padding: 12,
  paddingTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const Home = () => {
  return (
    <StyledContainer>
      <Stack spacing={4} direction="row">
        <Articles />
        <Categories />
        <Auth />
        <Settings />
      </Stack>
    </StyledContainer>
  );
}

export default Home;
