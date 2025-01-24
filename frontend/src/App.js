
import Dashboardd from "./pages/Dashboardd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import EditCmplnt from "./pages/EditCmplnt";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ComplaintList from "./pages/ComplaintList"
import Admin from "./pages/Admin"
import PrivateRoutes from "./pages/PrivateRoutes";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/complaintlist" element={<ComplaintList />}></Route>
            <Route path="/createcomplaint" element={<Dashboardd />}></Route>
            <Route path="/editcomplaint/:id" element={<EditCmplnt />}></Route>
          </Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
