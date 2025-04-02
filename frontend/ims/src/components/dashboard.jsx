import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

export const Dashboard = () => {
    const { incidents, incident_get } = useContext(AuthContext);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate()


    const IncidentDetails = (incident_id) => {
        navigate(`/incident/${incident_id}/view`);
    }

    const updateIncident = (incident_id) => {
        navigate(`/incident/${incident_id}/edit`);
    };

    useEffect(() => {
        if (searchText.trim() === "") {
            incident_get("");  
        }
    }, [searchText]);
    
    const searchIncident = (e) => {
        e.preventDefault();
        incident_get(searchText);
    }
    
    return (
        <div className='container my-4'>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mt-2">Incidents List</h3>
                <div className="d-flex align-items-center ms-auto">
                    <form className="d-flex" onSubmit={searchIncident}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Enter incident ID"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="btn btn-outline-success bg-light text-dark" type="submit">Search</button>
                    </form>

                    <Link to="/incident/new" className="btn btn-success ms-2">Add New Incident</Link>
                </div>
            </div>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
                <tbody>
                    {incidents?.length > 0 ? (
                        incidents.map((incident) => (
                            <tr key={incident.incident_id}>
                                <td>{incident.incident_id}</td>
                                <td>{incident.title}</td>
                                <td>{incident.type}</td>
                                <td>{incident.priority}</td>
                                <td>{incident.status}</td>
                                <td className='d-flex gap-3'>
                                    <button className="btn btn-info btn-sm" onClick={() => IncidentDetails(incident.incident_id)}>View</button>
                                    {incident.status === "closed" ? (
                                        <button className="btn btn-primary btn-sm w" onClick={() => updateIncident(incident.incident_id)} disabled>Edit</button>
                                    ) : (
                                        <button className="btn btn-primary btn-sm" onClick={() => updateIncident(incident.incident_id)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No incidents found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
