import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 500); // checks every 0.5 second

    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
