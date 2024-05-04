import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './List.css';

export default function ViewData({ data}) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

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

    return (
        <>
        <h2 class="heading">View Movie Details</h2>
        <div className='records'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item) => (
                        <tr key={item.Id}>
                            <td>{item.Id}</td>
                            <td>{item.Name}</td>
                            <td>{item.Rating}</td>
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