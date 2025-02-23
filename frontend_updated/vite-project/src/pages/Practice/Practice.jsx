import React, { useState, useEffect } from "react";
import "./Practice.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const dsaCategories = [
  "Arrays", "Linked List", "Stack", "Queue", "Recursion", "Sorting", "Graphs",
  "Trees", "Dynamic Programming", "Greedy", "Bit Manipulation", "Backtracking"
];

const aptitudeCategories = [
  "Numbers", "Percentages", "Profit & Loss", "Time & Work", "Time & Distance",
  "Ratio & Proportion", "Permutation & Combination", "Probability", "Data Interpretation"
];

const Practice = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("DSA");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const endpoint = selectedSection === "DSA" 
          ? "http://localhost:5000/api/update/dsa/questions"
          : "http://localhost:5000/api/update/aptitude/questions";
        
        const response = await axios.get(`${endpoint}?page=${currentPage}&limit=${itemsPerPage}`);
        setProblems(response.data.questions);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to fetch questions. Please try again later.");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedSection, currentPage, itemsPerPage]);

  const categories = selectedSection === "DSA" ? dsaCategories : aptitudeCategories;
  
  const filteredProblems = selectedCategory === "All"
    ? problems
    : problems.filter((problem) => problem.category === selectedCategory);

  // Add pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add Pagination component
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
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="practice-container">
      <div className="left-sidebar">
        <button
          className={selectedSection === "DSA" ? "active" : ""}
          onClick={() => {
            setSelectedSection("DSA");
            setSelectedCategory("All");
          }}
        >
          <i className="fas fa-code"></i>
          <span>DSA</span>
        </button>
        <button
          className={selectedSection === "Aptitude" ? "active" : ""}
          onClick={() => {
            setSelectedSection("Aptitude");
            setSelectedCategory("All");
          }}
        >
          <i className="fas fa-brain"></i>
          <span>Aptitude</span>
        </button>
      </div>

      <div className="right-section">
        <div className="categories-container">
          <div className="categories-scroll">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => setSelectedCategory("All")}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="problems-container">
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr
                  key={problem.id}
                  onClick={() => {
                    const route = selectedSection === "DSA" 
                      ? `/compiler/${problem.id}` 
                      : `/aptitude/question/${problem.id}`;  // Changed from /submission to /aptitude
                    navigate(route);
                  }}
                >
                  <td id="problem-title">{`${problem.id}. ${problem.title}`}</td>
                  <td>{problem.category}</td>
                  <td className={`difficulty-${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </td>
                  <td className={problem.status === "Solved" ? "solved" : "not-attempted"}>
                    {problem.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Practice;
