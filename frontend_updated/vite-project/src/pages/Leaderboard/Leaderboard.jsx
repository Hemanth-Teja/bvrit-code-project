import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import axios from "axios";
const apiUrl = import.meta.env.API_URL;

const Leaderboard = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/questions/userdata?page=${currentPage}&limit=${itemsPerPage}`
        );
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  let filteredStudents = students;

  if (selectedBranch !== "All") {
    filteredStudents = filteredStudents.filter((student) => student.branch === selectedBranch);
  }

  if (selectedYear !== "All") {
    filteredStudents = filteredStudents.filter((student) => student.year === selectedYear);
  }

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination component
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

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-button ${currentPage === number ? "active" : ""}`}
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
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="filters">
        <label className="filter-label">
          <i className="fas fa-code-branch"></i> Branch:
        </label>
        <select value={selectedBranch} onChange={handleBranchChange}>
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
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="All">All Years</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2022">2025</option>
          <option value="2023">2026</option>
          <option value="2024">2027</option>
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.rank}</td>
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
                <td colSpan="7" className="no-data">
                  No students found matching the criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Leaderboard;