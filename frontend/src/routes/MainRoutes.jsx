import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import RegistrationPage from "../components/auth/Registration";
import LoginPage from "../components/auth/Login";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route index element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
