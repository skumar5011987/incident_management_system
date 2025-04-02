
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import axios from "../axios";

export const IncidentDetails = () => {
    const { loading } = useContext(AuthContext);
    const { incident_id } = useParams();
    const [incident, setIncident] = useState(null);

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await axios.get(`api/incident/${incident_id}/`);
                if (response.data) {
                    setIncident(response.data);
                } else {
                    console.log("Unable to get Incident");
                }
            } catch (error) {
                console.error("Error fetching incident:", error);
            }
        };

        fetchIncident();
    }, [incident_id]); 

    if (!incident) return <p>{loading}</p>;

    return (
        <div className="container my-4 w-50">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mx-2 mt-4">Incident Details</h2>
                <Link to="/dashboard" className="btn btn-secondary mt-3">Back to Dashboard</Link>
            </div>
            <div className="card">
                <div className="card-body">
                    <p><strong>Title:</strong> {incident.title}</p>
                    <p><strong>Details:</strong> {incident.details}</p>
                    <p><strong>Type:</strong> {incident.type}</p>
                    <p><strong>Status:</strong> {incident.status}</p>
                    <p><strong>Priority:</strong> {incident.priority}</p>
                    <p><strong>Reported By:</strong> {incident.reporter_name} ({incident.reporter_email})</p>
                    <p><strong>Phone:</strong> {incident.reporter_phone}</p>
                    <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
                </div>
            </div>
            {incident.status === "closed" ? (
                <button className="btn btn-secondary mt-3" disabled>Edit</button>
            ) : (
                <Link to={`/incident/${incident.incident_id}/edit`} className="btn btn-secondary mt-3">Edit</Link>
            )}
        </div>
    );
};
