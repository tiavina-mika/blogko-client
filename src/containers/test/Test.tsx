import { Stack, styled } from '@mui/material';
import Articles from './Articles';
import Categories from './Categories';
import Auth from './Auth';
import Settings from './Settings';
import Search from './Search';

const StyledContainer = styled('div')({
  padding: 12,
  paddingTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const Test = () => {
  return (
    <StyledContainer>
      <Stack spacing={4} direction="row">
        <Articles />
        <Categories />
        <Auth />
        <Settings />
        <Search />
      </Stack>
    </StyledContainer>      

  );
}

export default Test;
