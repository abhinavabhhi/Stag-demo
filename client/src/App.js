import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStagRequest from "./component/AddStagRequest";
import { Dashboard } from "./component/Dashboard";
import Header from "./component/Header";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/modal.css";
import theme from "./assets/styles/theme";
import FileUploadModal from "./component/FileUploadModal";
import EditStagRequest from "./component/EditStagRequest";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modal" element={<FileUploadModal />} />
            <Route path="/add" element={<AddStagRequest />} />
            <Route path="/update/:id" element={<EditStagRequest />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
