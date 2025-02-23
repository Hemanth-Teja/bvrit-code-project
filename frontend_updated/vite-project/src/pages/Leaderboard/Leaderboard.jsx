import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents();
  }, [selectedBranch, selectedYear, currentPage]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      let endpoint = `http://localhost:5000/api/students?page=${currentPage}&limit=10`;

      if (selectedBranch !== "All") {
        endpoint = `http://localhost:5000/api/students/branch/${selectedBranch}?page=${currentPage}&limit=10`;
      } else if (selectedYear !== "All") {
        endpoint = `http://localhost:5000/api/students/year/${selectedYear}?page=${currentPage}&limit=10`;
      }

      const response = await axios.get(endpoint);
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch students data");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <div className="filters">
        <label className="filter-label">
          <i className="fas fa-code-branch"></i> Branch:
        </label>
        <select 
          value={selectedBranch} 
          onChange={(e) => {
            setSelectedBranch(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="CSD">CSD</option>
        </select>

        <label className="filter-label">
          <i className="fas fa-calendar-alt"></i> Year:
        </label>
        <select 
          value={selectedYear} 
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Years</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>ID</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Aptitude</th>
              <th>DSA</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>{student.year}</td>
                  <td>{student.aptitude_solved}</td>
                  <td>{student.dsa_solved}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default Leaderboard;
