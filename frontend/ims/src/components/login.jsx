import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        login(credentials, navigate);
    };

    return (
        <div className="card p-4">
            <h4 className="mx-2 mb-4 fw-bold">USER LOGIN</h4>
            <label className="mt-2">Email *</label>
            <input type="email" className="form-control rounded-pill my-1" name="email" onChange={handleChange} required />

            <label className="mt-2">Password *</label>
            <input type="password" className="form-control rounded-pill my-1" name="password" onChange={handleChange} required />
            {/* Forgot Password Link*/}
            <div className="my-4 d-flex justify-content-end gap-3">
                <Link to="/forgot-password" className="text-primary text-decoration-none">Forgot Password?</Link>
            </div>
            <button className="btn btn-success rounded-pill fw-bolder w-100" onClick={handleSignIn}>LOG ME IN</button>
        </div>
    );
};
