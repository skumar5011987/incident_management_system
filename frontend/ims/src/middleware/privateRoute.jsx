import { useContext, React, } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (!user) {
        console.log("UESR:", user)
        return <Navigate to="/" />;
    }
    return children;
}

export default PrivateRoute;