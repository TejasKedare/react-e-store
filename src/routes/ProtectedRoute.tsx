import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  // If user not logged in → redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
