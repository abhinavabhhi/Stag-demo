import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./component/Header";
import WrapperContainer from "./component/WrapperContainer";
import theme from "./assets/styles/theme";
import "./styles/modal.css";
import "./styles/loadingSpinner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<WrapperContainer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
