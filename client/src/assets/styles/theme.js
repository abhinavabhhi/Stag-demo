import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          tag: {
            backgroundColor: '#52525b', // Change this color to your desired color
            color: '#fff', // Change this color to the text color you want
            border:'#009688'
          },
        },
      },
    },
    palette: {
      primary: {
        light: '#52525b',
        main: '#27272a',
        dark: '#52525b',
        contrastText: '#fff',
      },
      // Add other customizations to the palette if needed
    },
    typography: {
      h6:{
        fontFamily: 'Raleway, Arial',
        fontSize: '16px',
        fontWeight: "bold"
      }
    },
  });

  export default theme;