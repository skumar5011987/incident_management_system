import React, { useContext, useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";


export const SignUpForm = () => {
    const { register, location, fetchLocation } = useContext(AuthContext);
    const [pin, setPin] = useState(null);
    const navigate = useNavigate();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        register(credentials, navigate);

    };


    return (
        <div className="card p-4">
            <h3 className="mx-2 mb-4 fw-bold">USER SIGNUP</h3>
            <div className="mt-2">
                <label className="form-label">Individual/Enterprise/Government</label>
                <div className="row">
                    <div className="col-md-4 col-md-auto">
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
                    </div>
                    <div className="col-md-4 col-md-auto">
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
                    </div>
                    <div className="col-md-4 col-md-auto">
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
            </div>


            <div className="row mt-2">
                <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name *</label>
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
                    <label htmlFor="last_name" className="form-label">Last Name</label>
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
                <label htmlFor="email" className="form-label">
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
                <label htmlFor="address" className="form-label">
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
                    <label htmlFor="country" className="form-label">
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
                    <label htmlFor="state" className="form-label">
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
                    <label htmlFor="city" className="form-label">
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
                    <label htmlFor="pincode" className="form-label">
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
                <label htmlFor="mobile" className="form-label">Mobile Number *</label>
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
                    <label htmlFor="fax" className="form-label">
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
                    <label htmlFor="phone" className="form-label">
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
                <label htmlFor="password" className="form-label">
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

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
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

            <button type="submit" className="btn btn-success rounded-pill fw-bold mt-2 w-100" onClick={handleSubmit}>
                SIGNUP
            </button>
        </div>
    );
};

