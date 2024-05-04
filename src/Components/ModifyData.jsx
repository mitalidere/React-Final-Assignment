import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './List.css';
import { useNavigate } from 'react-router-dom';

export default function ModifyData({ data, setData }) {
    const navigate = useNavigate();
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newRating, setNewRating] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ Id: '', Name: '', Rating: ''});
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const handleCreate = () => {
        if(newId!=='' && newName!=='' && newRating!=='') {
        setData(prevData => [
            ...prevData,
            { Id: newId, Name: newName, Rating: newRating}
        ]);
        setNewId('');
        setNewName('');
        setNewRating('');
        alert("Data added successfully")
    }
    else {
        alert("Enter all the details");
    }
    };

    const handleDelete = (id) => {
        const msg=window.confirm("Are you sure you want to delete the record?");
        if(msg) {
            setData(prevData => prevData.filter(item => item.Id !== id));
        }
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleUpdate = (id) => {
        setData(prevData => prevData.map(item => item.Id === id ? { ...item, ...editFormData } : item));
        setEditingId(null);
        setEditFormData({ Id: '', Name: '', Rating: '' });
    };

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCPage(number) {
        setCurrentPage(number);
    }

    function logout() {
        const msg=window.confirm("Are you sure you want to logout?");
        if(msg) {
        navigate('/');
        }
    }

    return (
        <>
        <div class="heading">
            <h2>Movie Details</h2>
            <button id="logout" className='btn btn-secondary' onClick={logout}>Logout</button>
            </div>
        <div className='records'>
            <div>
                <input class="input" type="text" placeholder="ID" value={newId} onChange={e => setNewId(e.target.value)} />
                <input class="input" type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
                <input class="input" type="text" placeholder="Rating" value={newRating} onChange={e => setNewRating(e.target.value)} />
                <button className='btn btn-primary' onClick={handleCreate}>Add Data</button>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item) => (
                        <tr key={item.Id}>
                            {editingId === item.Id ? (
                                <>
                                    <td><input type="text" value={editFormData.Id} name="Id" onChange={handleEditFormChange} /></td>
                                    <td><input type="text" value={editFormData.Name} name="Name" onChange={handleEditFormChange} /></td>
                                    <td><input type="text" value={editFormData.Rating} name="Rating" onChange={handleEditFormChange} /></td>
                                    <td>
                                        <button class="button" onClick={() => handleUpdate(item.Id)}>Save</button>
                                        <button class="button" onClick={() => setEditingId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.Id}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Rating}</td>
                                    <td>
                                        <button class="button" onClick={() => {
                                            setEditingId(item.Id);
                                            setEditFormData({ Id: item.Id, Name: item.Name, Rating: item.Rating});
                                        }}>Update</button>
                                        <button class="button" onClick={() => handleDelete(item.Id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'><a href='#' className='page-link' onClick={prePage}>Prev</a></li>
                    {numbers.map((number) => (
                        <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                            <a href='#' className='page-link' onClick={() => changeCPage(number)}>{number}</a>
                        </li>
                    ))}
                    <li className='page-item'><a href='#' className='page-link' onClick={nextPage}>Next</a></li>
                </ul>
            </nav>
        </div>
        </>
    );
}