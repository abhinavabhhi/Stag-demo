import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          tag: {
            backgroundColor: '#33ab9f', // Change this color to your desired color
            color: '#fff', // Change this color to the text color you want
            border:'#009688'
          },
        },
      },
    },
    palette: {
      primary: {
        light: '#33ab9f',
        main: '#009688',
        dark: '#00695f',
        contrastText: '#fff',
      },
      // Add other customizations to the palette if needed
    },
  });

  export default theme;