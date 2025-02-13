import React, { useState } from "react";
import "./Practice.css";
import { useNavigate } from "react-router-dom";

const dsaCategories = [
  "Arrays", "Linked List", "Stack", "Queue", "Recursion", "Sorting", "Graphs",
  "Trees", "Dynamic Programming", "Greedy", "Bit Manipulation", "Backtracking"
];

const aptitudeCategories = [
  "Numbers", "Percentages", "Profit & Loss", "Time & Work", "Time & Distance",
  "Ratio & Proportion", "Permutation & Combination", "Probability", "Data Interpretation"
];

const dsaProblems = [
  {
    "id": 1,
    "title": "Implement a function to reverse a linked list.",
    "description": "Given a singly linked list, reverse the linked list and return the new head.",
    "category": "Linked List",
    "difficulty": "Medium",
    "exampleInput": "head -> 1 -> 2 -> 3 -> null",
    "exampleOutput": "null -> 3 -> 2 -> 1",
    "submitInput": "head -> 5 -> 4 -> 3 -> 2 -> 1 -> null",
    "submitOutput": "null -> 1 -> 2 -> 3 -> 4 -> 5",
    "explanation": "Use the iterative approach to reverse the linked list by updating the next pointers."
  },
  {
    "id": 2,
    "title": "Find the middle element of a linked list.",
    "description": "Given a singly linked list, find the middle element. If the list has an even number of elements, return the second middle element.",
    "category": "Linked List",
    "difficulty": "Easy",
    "exampleInput": "head -> 1 -> 2 -> 3 -> 4 -> null",
    "exampleOutput": "3",
    "submitInput": "head -> 1 -> 2 -> 3 -> 4 -> 5 -> null",
    "submitOutput": "3",
    "explanation": "Use the two-pointer approach, one pointer moves one step at a time and the other moves two steps."
  },
];

const aptitudeProblems = [
 
  {
    "id": 1,
    "title": "What is the sum of 256 and 98?",
    "options": ["354", "346", "360", "368"],
    "correctAnswer": "354",
    "category": "Arithmetic",
    "difficulty": "Easy",
    "explanation": "Simple addition: 256 + 98 = 354."
  }
  

];

const Practice = () => {
  const navigate=useNavigate("/practice")
  const [selectedSection, setSelectedSection] = useState("DSA");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = selectedSection === "DSA" ? dsaCategories : aptitudeCategories;
  const problems = selectedSection === "DSA" ? dsaProblems : aptitudeProblems;

  const filteredProblems =
    selectedCategory === "All"
      ? problems
      : problems.filter((problem) => problem.category === selectedCategory);

  return (
    <div className="practice-container">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <button
          className={selectedSection === "DSA" ? "active" : ""}
          onClick={() => {
            setSelectedSection("DSA");
            setSelectedCategory("All");
          }}
        >
          DSA
        </button>
        <button
          className={selectedSection === "Aptitude" ? "active" : ""}
          onClick={() => {
            setSelectedSection("Aptitude");
            setSelectedCategory("All");
          }}
        >
          Aptitude
        </button>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Categories Section */}
        <div className="categories-container">
          <div className="categories-scroll">
            <button
              className={`cat-hover ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-hover ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Problems Table */}
        <div className="problems-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  {filteredProblems.map((problem, index) => (
    <tr onClick={
      () => {
        const route = selectedSection === "DSA" ? `/compiler/${problem.id}` : `/submission/${problem.id}`;
        navigate(route);
      }
    } key={index}>
      <td >{`${problem.id} . ${problem.title}`} </td>
      <td>{problem.category}</td>
      <td className={
        problem.difficulty === "Easy" ? "difficulty-easy" :
        problem.difficulty === "Medium" ? "difficulty-medium" :
        "difficulty-hard"
      }>
        {problem.difficulty}
      </td>
      <td className={problem.status === "Solved" ? "solved" : ""}>
        {problem.status}
      </td>
    </tr>
  ))}
  
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Practice;
