import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Alert, Box, Card, CardContent } from '@mui/material';

import { hasUserConnected } from '../../actions/auth';
import { goToHome } from '../../actions/home';
import { useState } from 'react';

const AuthLayout = () => {
  const { data: hasUser } = useQuery(['hasUserConnected'], () => hasUserConnected());

  const [error, setError] = useState<string>('');

  if (hasUser) {
    return <Navigate  to={goToHome()} />;
  }

  return (
    <Box sx={{ bgcolor: grey[500] }}>
      <Box sx={{ minHeight: '100vh' }} className="flexCenter">
        <Card sx={{ width: 400 }}>
          <CardContent>
            {error && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {error}
              </Alert>
            )}
            <Outlet context={{ layoutError: error, setLayoutError: setError }} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AuthLayout;