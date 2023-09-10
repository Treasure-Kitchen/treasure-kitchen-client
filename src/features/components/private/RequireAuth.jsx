import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ( { allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

  return (
    allowedRoles?.includes(user?.user?.role)
            ? <Outlet />
            : user?.user?.id
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth