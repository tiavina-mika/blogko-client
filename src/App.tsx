import './index.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import Home from './containers/Home';
import { theme } from './utils/theme.utils';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
