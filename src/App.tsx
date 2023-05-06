import './index.css';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import Home from './containers/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


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
