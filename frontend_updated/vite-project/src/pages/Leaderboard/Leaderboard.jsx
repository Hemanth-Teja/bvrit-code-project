import React, { useState } from "react";
import "./Leaderboard.css";

const dummyStudents = [
  { id: "101", name: "Alice", branch: "CSE", year: "2022", aptitude_solved: 30, dsa_solved: 50 },
  { id: "102", name: "Bob", branch: "IT", year: "2023", aptitude_solved: 25, dsa_solved: 40 },
  { id: "103", name: "Charlie", branch: "AIDS", year: "2022", aptitude_solved: 20, dsa_solved: 35 },
  { id: "104", name: "David", branch: "AIML", year: "2024", aptitude_solved: 40, dsa_solved: 55 },
  { id: "105", name: "Eve", branch: "CSD", year: "2023", aptitude_solved: 10, dsa_solved: 25 },
  { id: "106", name: "Frank", branch: "CSE", year: "2022", aptitude_solved: 35, dsa_solved: 45 },
  { id: "107", name: "Grace", branch: "IT", year: "2024", aptitude_solved: 15, dsa_solved: 30 },
];

const Leaderboard = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const rankStudents = (students) => {
    return students
      .map((student) => ({
        ...student,
        totalSolved: student.aptitude_solved + student.dsa_solved,
      }))
      .sort((a, b) => b.totalSolved - a.totalSolved)
      .map((student, index) => ({ ...student, rank: index + 1 }));
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  let filteredStudents = dummyStudents;

  if (selectedBranch !== "All") {
    filteredStudents = filteredStudents.filter((student) => student.branch === selectedBranch);
  }

  if (selectedYear !== "All") {
    filteredStudents = filteredStudents.filter((student) => student.year === selectedYear);
  }

  const rankedStudents = rankStudents(filteredStudents);

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
            {rankedStudents.length > 0 ? (
              rankedStudents.map((student) => (
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
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
            {rankedStudents.length > 0 ? (
              rankedStudents.map((student) => (
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
                <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
