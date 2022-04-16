import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#F29278',
          contrastText: '#fafafa',
        },
        secondary: {
          main: '#D16891',
        },
        background: {
          default: '#fdfafa',
        },
        text: {
          primary: '#222222',
          hint: '#333333',
          disabled: '#000000',
          secondary: '#444444',
        },
        error: {
          main: '#ff1401',
        },
      },
  });

export default theme;