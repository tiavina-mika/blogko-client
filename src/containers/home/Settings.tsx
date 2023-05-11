import { Stack, Button, styled, Typography } from '@mui/material';
import { cleanDatabase } from '../../actions/settings';


const StyledButton = styled(Button)({
  width: '18vw'
});

const Settings = () => {
  const handleCleanDatabase = async () => {
    await cleanDatabase()
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Settings
      </Typography>
      <StyledButton variant="contained" color="error" onClick={handleCleanDatabase}>Clean Database</StyledButton>
    </Stack>
  );
}

export default Settings;
