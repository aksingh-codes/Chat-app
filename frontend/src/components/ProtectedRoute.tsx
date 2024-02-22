import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = true;

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
