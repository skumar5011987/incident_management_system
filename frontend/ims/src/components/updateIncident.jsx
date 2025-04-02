import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import axios from "../axios";

const IncidentUpdate = () => {
    const { incident_id } = useParams();
    const { incident_update } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        details: "",
        type: "",
        priority: "",
        status: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await axios.get(`api/incident/${incident_id}/`);
                if (response.data){
                    setFormData(response.data)
                }
            } catch (error) {
                console.error("Error fetching incident:", error);
            }
        };

        fetchIncident();
    }, [incident_id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await incident_update(formData, incident_id, navigate);
    };

    return (
        <div className="container container-md mt-4 w-50">
            <div className="d-flex justify-content-between mb-2">
                <h2 className="mt-2">Update Incident</h2>
                <Link to="/dashboard" className="btn btn-secondary mt-3">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="card p-4">
                <div className="mb-3">
                    <label className="form-label">Enterprise/Government</label>
                    <div className="d-flex gap-5">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                value="enterprise"
                                checked={formData.type === "enterprise"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Enterprise</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                value="government"
                                checked={formData.type === "government"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Government</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea
                        name="details"
                        className="form-control"
                        rows="3"
                        value={formData.details}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <div className="d-flex gap-5">
                        {["low", "medium", "high"].map((level) => (
                            <div className="form-check" key={level}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="priority"
                                    value={level}
                                    checked={formData.priority === level}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">{level.replace(/\b\w/g, (char) => char.toUpperCase())}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div className="d-flex gap-5">
                        {["open", "in_progress", "closed"].map((state) => (
                            <div className="form-check" key={state}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    value={state}
                                    checked={formData.status === state}
                                    onChange={handleChange}
                                />
                                {/* <label className="form-check-label">{state.replace("_", " ")}</label> */}
                                <label className="form-check-label">
                                    {state.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-success rounded-pill fw-bolder">
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default IncidentUpdate;
