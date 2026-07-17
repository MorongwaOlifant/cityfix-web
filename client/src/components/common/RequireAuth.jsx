import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  // Wait for auth loading to complete
  if (auth.loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  const isAuthenticated =
    typeof auth?.isAuthenticated === "function"
      ? auth.isAuthenticated()
      : !!auth?.token && !!auth?.user;

  if (!isAuthenticated) {
    return <Navigate to="/login/user" state={{ from: location }} replace />;
  }

  return children;
}
