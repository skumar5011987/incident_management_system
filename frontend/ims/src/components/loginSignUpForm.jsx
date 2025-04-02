import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import AuthContext from "../context/authContext";

const LoginSignUpForm = () => {
    const [activeTab, setActiveTab] = useState("login");
    const { user, login, register, location, fetchLocation } = useContext(AuthContext);
    const [pin, setPin] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const [credentials, setCredentials] = useState({
        type: "individual",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        mobile: "",
        fax: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const { type, first_name, last_name, email, address, country, state, city, pincode, mobile, fax, phone, password, confirmPassword } = credentials;

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handlePhoneChange = (value) => {
        setCredentials({ ...credentials, mobile: value });
    };

    const handlePincodeChange = (e) => {
        setPin(e.target.value);
    };

    // Fetch location when pin is 6 digits long
    useEffect(() => {
        if (pin?.length === 6) {
            fetchLocation(pin);
        }
    }, [pin, fetchLocation]);

    // Update credentials only if location has changed
    useEffect(() => {
        setCredentials(prev => {
            if (
                prev.pincode === pin &&
                prev.country === location?.country &&
                prev.state === location?.state &&
                prev.city === location?.city
            ) {
                return prev; // Prevent unnecessary state updates
            }
            return {
                ...prev,
                pincode: pin,
                country: location?.country || "",
                state: location?.state || "",
                city: location?.city || "",
            };
        });
    }, [pin, location]);

    const handleSignIn = (e) => {
        e.preventDefault();
        login(credentials, navigate);
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        register(credentials, navigate);
    }
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
                <div className="card p-4">
                    <h3 className="mx-2 mb-4 fw-bold">USER SIGNUP</h3>

                    <div className="mt-2">
                        <label >Individual/Enterprise/Government</label>
                        <div className="d-flex gap-5">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="type"
                                    id="individual"
                                    value="individual"
                                    checked={type === "individual"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="individual">Individual</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="type"
                                    id="enterprise"
                                    value="enterprise"
                                    checked={type === "enterprise"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="enterprise">Enterprise</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="type"
                                    id="government"
                                    value="government"
                                    checked={type === "government"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="government">Government</label>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label htmlFor="first_name" >First Name *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter First name"
                                value={first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="last_name" >Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                placeholder="Enter Last name"
                                value={last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="email" >
                            Email *
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="address" >
                            Address *
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                            value={address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label htmlFor="country">
                                Country *
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                placeholder="Country"
                                value={country}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="state">
                                State *
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                placeholder="State"
                                value={state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label htmlFor="city">
                                City *
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="pincode">
                                Pincode *
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                name="pincode"
                                placeholder="ex: 210020"
                                value={pincode}
                                onChange={handlePincodeChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <PhoneInput
                            country={"in"} // Default country
                            id="mobile"
                            name="mobile"
                            value={mobile}
                            onChange={handlePhoneChange} // Fixed handler
                            inputClass="form-control w-100"
                            dropdownClass="dropdown-menu"
                            enableSearch={true}
                            required
                        />
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label htmlFor="fax">
                                Fax
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fax"
                                name="fax"
                                placeholder="ex: 011-55543214"
                                value={fax}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="ex: 011-55543214"
                                value={phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="password">
                            Password *
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="confirmPassword">
                            Confirm Password *
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-success rounded-pill fw-bolder my-4 w-100" onClick={handleSignUp}>SIGNUP</button>
                </div>
            )}

            {/* Login Form */}
            {activeTab === "login" && (
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
            )}
        </div>
    );
};

export default LoginSignUpForm;
