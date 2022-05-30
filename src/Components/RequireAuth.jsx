import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
