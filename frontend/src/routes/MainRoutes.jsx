import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import RegistrationPage from "../components/auth/Registration";
import LoginPage from "../components/auth/Login";
// import PrivateRoute from "../components/privateRoute/PrivateRoute";
import AdminPanel from "../components/admin/adminPanel";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route index element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="adminPanel" element={<AdminPanel />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
