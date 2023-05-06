import { createTheme } from '@mui/material';
import {  green, indigo } from '@mui/material/colors';


export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
    secondary: {
      main: green[500],
    },
  },
});