import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStagRequest from "./component/AddStagRequest";
import { Dashboard } from "./component/Dashboard";
import Header from "./component/Header";
//import Update from "./pages/Update";

function App() {
  return (
    <div className="app">
     <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/add" element={<AddStagRequest />} />
          {/* <Route path="/update/:id" element={<Update />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;