import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const users = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" },
        { username: "user3", password: "pass3" },
        { username: "user4", password: "pass4" },
        { username: "user5", password: "pass5" }
    ];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            login();
            navigate('/modifydata');
        } else {
            setErrorMessage("Invalid credentials!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-3"><center>Login</center></h2>
                    <form onSubmit={handleLogin} className="card card-body">
                        <div className="mb-3">
                        <br/>
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <br/>
                    </form>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}