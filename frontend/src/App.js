
import Dashboardd from "./pages/Dashboardd";
import { BrowserRouter, Routes, Route, Link,Navigate  } from "react-router-dom"
import EditCmplnt from "./pages/EditCmplnt";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ComplaintList from "./pages/ComplaintList"
import Admin from "./pages/Admin"
import PrivateRoutes from "./pages/PrivateRoutes";
import { getUserRole } from "./utils/auth";

import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

const ProtectedRoute = ({ role, children }) => {
  const userRole = getUserRole();
  if (!userRole) {
    return <Navigate to="/login" />;
  }
  if (userRole !== role) {
    return <Navigate to={`/${userRole}`} />;
  }
  return children;
};
function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        ><Route path="/admin/dashboard" element={<Admin />}></Route></Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserPage/>
            </ProtectedRoute>
          }
          >
            <Route path="/user/complaintlist" element={<ComplaintList />}></Route>
            <Route path="/user/createcomplaint" element={<Dashboardd />}></Route>
            <Route path="/user/editcomplaint/:id" element={<EditCmplnt />}></Route>
          </Route>
         
        <Route path="/login" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} ></Route>
      </Routes>
        {/* <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/complaintlist" element={<ComplaintList />}></Route>
            <Route path="/createcomplaint" element={<Dashboardd />}></Route>
            <Route path="/editcomplaint/:id" element={<EditCmplnt />}></Route>
          </Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
