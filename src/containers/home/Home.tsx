import { Stack, styled, Container } from '@mui/material';
import Articles from './Articles';
import Categories from './Categories';
import Auth from './Auth';
import Settings from './Settings';
import Layout from '../../components/layout/Layout';

const StyledContainer = styled('div')({
  padding: 12,
  paddingTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const Home = () => {
  return (
    // <Layout>
      <StyledContainer>
        <Stack spacing={4} direction="row">
          <Articles />
          <Categories />
          <Auth />
          <Settings />
        </Stack>
      </StyledContainer>      
    // </Layout>

  );
}

export default Home;
