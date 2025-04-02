import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';


export const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    // const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-4 fw-bold text-light" to="/">IMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav w-100 d-flex align-items-center">
                            {user ? (
                                <>
                                    <li className="nav-item fw-bolder">
                                        <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
                                    </li>

                                    <div className="d-flex align-items-center ms-auto me-3">
                                        <li className="nav-item fw-bolder">
                                            <button className='nav-link btn btn-sm btn-primary text-light'>{`${user.first_name} ${user.last_name}`.toUpperCase()}</button>
                                        </li>
                                        <li className="nav-item fw-bolder">
                                            <button className='nav-link btn btn-sm btm-primary text-light' onClick={logout}>Logout</button>
                                        </li>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item fw-bolder">
                                        <Link className="nav-link text-light" to="/">Home</Link>
                                    </li>
                                </>
                            )}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
