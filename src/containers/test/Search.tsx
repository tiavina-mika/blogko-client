import { Stack, Button, styled, Typography } from '@mui/material';
import { searchUserByFullName } from '../../actions/search';

const StyledButton = styled(Button)({
  width: '18vw'
});

const Search = () => {
  const handleSearchUserByFullName = async () => {
    const values = {
      firstName: 'Ben',
      lastName: 'Ralai',
    }
    await searchUserByFullName(values);
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Search
      </Typography>
      <StyledButton variant="contained" color="primary" onClick={handleSearchUserByFullName}>Search user full name</StyledButton>
    </Stack>
  );
}

export default Search;
