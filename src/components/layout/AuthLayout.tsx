import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Box, Card, CardContent } from '@mui/material';

import { getCurrentUser } from '../../actions/auth';
import { goToHome } from '../../actions/home';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isSuccess } = useQuery(['currentUser'], () => getCurrentUser());

  if (isSuccess) {
    navigate(goToHome());
  }

  return (
    <Box sx={{ bgcolor: grey[500] }}>
      <Box sx={{ minHeight: '100vh' }} className="flexCenter">
        <Card sx={{ width: 400 }}>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AuthLayout;