import { Stack, Button, styled, Typography } from '@mui/material';
import { deleteMyAccount, getCurrentUser, login, logout, signUp } from '../../actions/auth';


const StyledButton = styled(Button)({
  width: '18vw'
});

const Auth = () => {
  const handleSignUp = async () => {
    const values = {
      lastName: 'User One',
      firstName: 'Mik',
      email: 'user1@gmail.com',
      password: 'user1@gmail.com',
      passwordConfirmation: 'user1@gmail.com',
      username: 'user1@gmail.com'
    }
    await signUp(values)
  }

  const handleLogOut = async () => {
    await logout()
  }

  const handleLogin = async () => {
    const values = {
      email: 'user1@gmail.com',
      password: 'user1@gmail.com',
    }
    await login(values)
  }

  const handleProfile = async () => {
    await getCurrentUser()
  }

  const handleDeleteMyAccount = async () => {
    await deleteMyAccount()
  }

  const handleMultipleSignUp = async () => {
    for (const number of [4, 5, 6, 7, 8, 9]) {
      const email = `user${number}@gmail.com`
      const values = {
        lastName: 'User ' + number,
        firstName: 'Test',
        email,
        password: email,
        passwordConfirmation: email,
        username: email
      }

      await signUp(values)
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Auth
      </Typography>
      <StyledButton variant="contained" color="info" onClick={handleSignUp}>SignUp</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleLogin}>Login</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleLogOut}>Log out</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleProfile}>Profile</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleDeleteMyAccount}>Delete my account</StyledButton>
      <StyledButton variant="contained" color="info" onClick={handleMultipleSignUp}>Create Multiple User</StyledButton>
    </Stack>
  );
}

export default Auth;
