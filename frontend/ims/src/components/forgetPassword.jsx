import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const ForgetPasswordForm = () => {
    const [credentials, setCreatedtials] = useState({email:""});
    const {forget_password} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        forget_password(credentials, navigate);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ width: "700px" }}>
                <h3 className=" mx-2 mb-4">Forget Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input type="email" className="form-control rounded-pill" id="email" placeholder="Enter your email" value={credentials.email}
                            onChange={(e) => setCreatedtials({...credentials, email: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success rounded-pill fw-bold w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
