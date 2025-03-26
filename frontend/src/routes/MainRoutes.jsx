import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import RegistrationPage from "../components/auth/Registration";
import LoginPage from "../components/auth/Login";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import AdminPanel from "../components/admin/adminPanel";
import Home from "../components/pages/Home";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="adminPanel"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
