import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../axios"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [incidents, setIncidents] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    // check at page reload
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUserData(token);
        } else {
            setLoading(false)
        }
    }, [])

    // if get user data if logged in
    const fetchUserData = async (token) => {
        try {
            // get user info
            let response = await axios.get("/api/dashboard/");
            // console.log(response.data);
            setUser(response.data);

            // get user's incidents
            response = await axios.get("/api/incidents/");
            setIncidents(response.data)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const register = async (credentials, navigate) => {
        try {
            console.log("Rgister form data:", credentials);
            const response = await axios.post("/api/auth/sign-up/", credentials);
            console.log("response", response.data)
            alert("Registration Successfuly");
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // login user
    const login = async (credentials, navigate) => {
        try {
            console.log("Login form data:", credentials);
            const response = await axios.post("/api/auth/login/", credentials);

            const _user = JSON.stringify(response.data.user)
            const token = response.data.access;
            const refresh = response.data.refresh;

            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refresh);
            localStorage.setItem("user", _user);
            setUser(_user);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await fetchUserData(token);
            navigate("/dashboard");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const forget_password = async (credentials, navigate) => {
        try {
            console.log("forget passwod data:", credentials)
            const response = await axios.post("/api/auth/forget-password/", credentials);
            alert(response.data.message);
            console.log("forget passwod response:", response.data)
            navigate("/")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const forget_password_confirm = async (credentials, navigate) => {
        try {
            console.log("forget passwod confirm data:", credentials)
            const response = await axios.post("/api/auth/forget-password-confirm/", credentials);
            alert(response.data.message);
            console.log("forget password confirm response:", response.data)
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    // logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setIncidents([]);
    }

    // Create incident
    const incident_create = async (data) => {
        try {
            console.log("Create incident data",data)
            const response = await axios.post("/api/incidents/", data);
            console.log(response)
            alert("Incident Created.");
            fetchUserData(localStorage.getItem("token"))
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const incident_get = async (incident_id = "") => {
        try {
            const url = incident_id ? `api/incident/${incident_id}/` : "api/incidents/";
            const response = await axios.get(url);
            console.log("Incident:", JSON.stringify(response.data))
            if (incident_id) {
                setIncidents(response.data ? [response.data] : []); // Only set state if searching
            } else {
                setIncidents(Array.isArray(response.data) ? response.data : response.data ? [response.data] : []);
            }
        } catch (error) {
            console.error("Error fetching incident:", error);
        }
    };

    const incident_update = async (formData, incident_id, navigate) => {
        try {
            console.log("Update incident data", formData)
            const response = await axios.post(`api/incident/${incident_id}/`, formData);
            alert(response.data.message);
            fetchUserData(localStorage.getItem("token"));
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLocation = useCallback(async (pincode) => {
        try {

            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

            if (response.data[0]?.PostOffice !== null) {

                const postOffice = response.data[0].PostOffice[0]; // Get first location
                setLocation({
                    country: postOffice.Country,
                    state: postOffice.State,
                    city: postOffice.Division,
                    pincode: postOffice.Pincode,
                });
            } else {
                setLocation(null);
                alert("Invalid Pincode.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user, incidents, fetchUserData, login, logout, loading, register, forget_password, forget_password_confirm, incident_create,
            incident_get, incident_update, location, fetchLocation,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;