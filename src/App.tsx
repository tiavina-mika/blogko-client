import './index.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.utils';
import Routes from './Routes';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
