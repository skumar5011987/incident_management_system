import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const IncidentCreate = () => {
    const { incident_create } = useContext(AuthContext);
    // const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        title: "",
        details: "",
        type: "enterprise",
        priority: "low",
        status: "open",
    });

    const { type, priority, status } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        incident_create(formData);
    };

    return (
        <div className="container mt-4 w-50">
            <div className="d-flex justify-content-between mb-2">
                <h2 className=" mx-2 mt-2">Add New Incident</h2>
                <Link to="/dashboard"  className="btn btn-secondary mt-3">Back to Deashboard</Link>
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
                    <label className="form-label">Select Priority</label>
                    <div className="d-flex gap-5">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priority"
                                id="priority"
                                value="low"
                                checked={priority === "low"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="low">Low</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priority"
                                id="medium"
                                value="medium"
                                checked={priority === "medium"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="medium">Medium</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priority"
                                id="high"
                                value="high"
                                checked={priority === "high"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="high">High</label>
                        </div>
                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div className="d-flex gap-5">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="status"
                                id="open"
                                value="open"
                                checked={status === "open"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="open">Open</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="status"
                                id="in progress"
                                value="in_progress"
                                checked={status === "in_progress"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="in_progress">In progress</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-success rounded-pill fw-bolder">
                    Create Incident
                </button>
            </form>
        </div>
    );
};

export default IncidentCreate;
