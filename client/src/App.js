import "./App.css";
// import ProductList from "./Components/Products";
import AdminDashboard from "./Components/Admin/AdminDashboard"
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      
      
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          
        </Routes>
      
      
    </div>
  );
}

export default App;
