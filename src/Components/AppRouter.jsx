import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import Login from './Login';
import ModifyData from './ModifyData';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import axios from 'axios';
import ViewData from './ViewData';
import './AppRouter.css';

export default function AppRouter() {
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyapi.online/api/movies');
                const moviesData = response.data.map(movie => ({
                    Id: movie.id,
                    Name: movie.movie,
                    Rating: movie.rating,
                }));
                setData(moviesData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);
    return (
        <AuthProvider>
            <Router>
            <nav class="navigator">
                <div class="div">
                    <Link class="link" to="/">Login</Link>   
                </div>
                <div class="div">
                    <Link class="link" to="/viewdata">View Data</Link> 
                </div>
            </nav>
                <Routes>
                <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route 
                        path="/modifydata" 
                        element={
                            <PrivateRoute>
                                <ModifyData data={data} setData={setData}/>
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/viewdata" element={<ViewData data={data} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}