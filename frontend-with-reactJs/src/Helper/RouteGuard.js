import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider'


const RouteGuard = ({ allowedRoles }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    console.log(currentUser?.role)
    console.log('type of allowedRoles : ',typeof allowedRoles)
    console.log('allowedRoles : ',allowedRoles)
    console.log(allowedRoles?.includes(currentUser?.role))
    return (
        allowedRoles?.includes(currentUser?.role) 
            ? <Outlet />
            : currentUser?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    ); 
} 
 
export default RouteGuard;