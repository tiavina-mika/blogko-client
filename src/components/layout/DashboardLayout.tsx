import { useState } from 'react';

import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigate, Navigate, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { grey } from '@mui/material/colors';

import { Button, Link, Stack } from '@mui/material';

import { goToArticles } from '../../actions/articles';
import { getCurrentUser, goToLogOut, goToLogin } from '../../actions/auth';

import SnackBar from '../SnackBar';
import { goToHome } from '../../actions/home';

const drawerWidth = 240;
const appBarHeight = 64;

const StyledToolbar = styled(Toolbar)({
  backgroundColor: grey[900],
});
interface ISideBarItem {
  url: string;
  label: string;
}
const sideBarItems: ISideBarItem[] = [
  {
    url: '/',
    label: 'Home'
  },
  {
    url: goToArticles(),
    label: 'Articles'
  },
]
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  // children: ReactNode;
}

const DashboardLayout = ({ window }: Props) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const {  data: currentUser, isError: isCurrentUserError, isLoading } = useQuery(['currentUser'], () => getCurrentUser(), {
    retry: 1
  });

  if (!isLoading && (!currentUser || isCurrentUserError)) {
    return <Navigate  to={goToLogin()} />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onCloseSnackBar = () => setError('');

  const _onLogout = () => {
   navigate(goToLogOut());
  }

  const drawer = (
    <div>
      {sideBarItems.map((path:ISideBarItem, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(path.url)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={path.label} />
            </ListItemButton>
          </ListItem>
        ))}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: appBarHeight
        }}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <Stack>
            <Button onClick={_onLogout} sx={{ color: '#fff', textTransform: 'initial' }}>
              Logout
            </Button>
          </Stack>
        </StyledToolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
        <List>
          {drawer}
        </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <StyledToolbar>
            <Box className="flexCenter" sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to={goToHome()} sx={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>
                Blogko
              </Link>
            </Box>
          </StyledToolbar>
          <Divider />
          <List>
            {drawer}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, minHeight: '100vh', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* children */}
        <Box sx={{ minHeight: `calc(100% - ${appBarHeight}px)`}} className="flexColumn">
          <Outlet context={{ layoutError: error, setLayoutError: setError, user: currentUser }} />
        </Box>
        {/* error snackbar */}
        <SnackBar open={!!error} message={error} severity="error" onClose={onCloseSnackBar} />
      </Box>
    </Box>
  );
}

export default DashboardLayout;