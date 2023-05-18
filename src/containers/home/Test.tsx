import { Stack, styled } from '@mui/material';
import Articles from './Articles';
import Categories from './Categories';
import Auth from './Auth';
import Settings from './Settings';

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
      </Stack>
    </StyledContainer>      

  );
}

export default Test;
