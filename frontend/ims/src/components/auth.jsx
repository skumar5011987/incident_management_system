import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { SignUpForm } from "./signup";
import { LoginForm } from "./login";

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState("login");
    const { user} = useContext(AuthContext);
    // const [pin, setPin] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    // const [credentials, setCredentials] = useState({
    //     type: "individual",
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     address: "",
    //     country: "",
    //     state: "",
    //     city: "",
    //     pincode: "",
    //     mobile: "",
    //     fax: "",
    //     phone: "",
    //     password: "",
    //     confirmPassword: "",
    // });
    // const { type, first_name, last_name, email, address, country, state, city, pincode, mobile, fax, phone, password, confirmPassword } = credentials;

    // const handleChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // };
    // const handlePhoneChange = (value) => {
    //     setCredentials({ ...credentials, mobile: value });
    // };

    // const handlePincodeChange = (e) => {
    //     setPin(e.target.value);
    // };

    // // Fetch location when pin is 6 digits long
    // useEffect(() => {
    //     if (pin?.length === 6) {
    //         fetchLocation(pin);
    //     }
    // }, [pin, fetchLocation]);

    // // Update credentials only if location has changed
    // useEffect(() => {
    //     setCredentials(prev => {
    //         if (
    //             prev.pincode === pin &&
    //             prev.country === location?.country &&
    //             prev.state === location?.state &&
    //             prev.city === location?.city
    //         ) {
    //             return prev; // Prevent unnecessary state updates
    //         }
    //         return {
    //             ...prev,
    //             pincode: pin,
    //             country: location?.country || "",
    //             state: location?.state || "",
    //             city: location?.city || "",
    //         };
    //     });
    // }, [pin, location]);

    // const handleSignIn = (e) => {
    //     e.preventDefault();
    //     login(credentials, navigate);
    // }
    // const handleSignUp = (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //         alert("Passwords do not match!");
    //         return;
    //     }
    //     register(credentials, navigate);
    // }
    return (
        <div className="container mt-4 w-50">
            {/* Header Tabs */}
            <div className="d-flex mb-4">
                <button
                    className={`btn ${activeTab === "login" ? "btn-success fw-bolder" : "btn-light"} rounded-pill w-50`}
                    onClick={() => setActiveTab("login")}
                >
                    LOGIN
                </button>
                <button
                    className={`btn ${activeTab === "signup" ? "btn-success fw-bolder" : "btn-light"} rounded-pill w-50`}
                    onClick={() => setActiveTab("signup")}
                >
                    SIGNUP
                </button>
            </div>

            {/* Signup Form */}
            {activeTab === "signup" && (
                <SignUpForm />
            )}

            {/* Login Form */}
            {activeTab === "login" && (
                <LoginForm />
            )}
        </div>
    );
};

export default AuthForm;
