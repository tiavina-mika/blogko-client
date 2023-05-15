import './index.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.utils';
import Routes from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>

  );
}

export default App;
