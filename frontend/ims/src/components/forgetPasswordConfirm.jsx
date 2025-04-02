import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ForgetPasswordConfirmForm = () => {
    const [searchParams] = useSearchParams();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const [credentials, setCredentials] = useState({ uid: uid, token: token, new_password: "", confirm_password: "" });
    const { forget_password_confirm } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Credentials:", credentials);

        if (credentials.new_password !== credentials.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await forget_password_confirm(credentials, navigate);
        } catch (error) {
            console.error("Password reset failed:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ width: "700px" }}>
                <h3 className="text-center mb-2">Set New Password</h3><hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="new_password"
                            name="new_password"
                            placeholder="Enter Password"
                            value={credentials.new_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm password"
                            value={credentials.confirm_password}
                            onChange={handleChange}
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
