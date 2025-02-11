import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa"; // Importing tick icon
import "./Practice.css";
import questions from "../../data/questions.js"; // Ensure the path is correct

function Practice() {
  // Extract unique categories from the questions dataset
  const categories = ["All", ...new Set(questions.map((q) => q.category))];

  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [solvedProblems, setSolvedProblems] = useState(new Set()); // Store solved problem IDs as a Set

  // Filter problems based on the selected category
  const filteredProblems =
    selectedCategory === "All"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      const token = localStorage.getItem("token"); // Get user token
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/solvedProblems", {
          headers: {
            Authorization: token, // Ensure "Bearer" is included if needed
          },
        });

        console.log(response.data.solvedproblems);

        // Convert the array into a Set
        setSolvedProblems(new Set(response.data.solvedproblems));
      } catch (error) {
        console.error("Error fetching solved problems:", error.response?.data || error.message);
      }
    };

    fetchSolvedProblems();
  }, []);

  return (
    <div className="practice">
      <h1>Practice Problems</h1>

      {/* Categories Section - Displayed Horizontally */}
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Problems List - Display as Table */}
      <table className="problems-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((problem, index) => (
            <tr key={problem.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/practice/${problem.id}`} className="problem-link">
                  {problem.title}
                </Link>
              </td>
              <td>{problem.category}</td>
              <td className={`difficulty ${problem.difficulty?.toLowerCase() || ""}`}>
                {problem.difficulty || "Unknown"}
              </td>
              <td>
                {/* Check if problem ID exists in the Set */}
                {solvedProblems.has(problem.id) && <FaCheckCircle color="white" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Practice;
