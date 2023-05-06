import { Stack, Button, styled, Typography } from '@mui/material';
import { logout, signUp } from '../actions/auth';


const StyledButton = styled(Button)({
  width: 400
});

const Auth = () => {
  const handleSignUp = async () => {
    const values = {
      name: 'zo',
      email: 'user1@gmail.com',
      password: 'user1@gmail.com',
    }
    await signUp(values)
  }

  const handleLogOut = async () => {
    await logout()
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Category
      </Typography>
      <StyledButton variant="contained" color="info" onClick={handleSignUp}>SignUp</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleLogOut}>LogOut</StyledButton>
      {/* <StyledButton variant="contained" color="secondary" onClick={handleCategoryCreation}>Login</StyledButton> */}
    </Stack>
  );
}

export default Auth;
