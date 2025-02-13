import React, { useState } from "react";
import "./AddQuestions.css";

function AddQuestions() {
  const [questionType, setQuestionType] = useState("dsa");
  const [formData, setFormData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Question:", formData);
    setFormData({});  // Clear form fields
  };

  const handleDeleteQuestion = () => {
    console.log(`Deleting ${questionType.toUpperCase()} Question with ID: ${deleteId}`);
    setDeleteId(""); // Clear delete field
  };

  return (
    <div className="add-questions-container">
      <h2>Add or Delete Questions</h2>
      <div className="selection">
        <label>Select Question Type:</label>
        <select onChange={(e) => setQuestionType(e.target.value)} value={questionType}>
          <option value="dsa">DSA</option>
          <option value="aptitude">Aptitude</option>
        </select>
      </div>

      {/* Add Question Form */}
      <form className="question-form" onSubmit={handleFormSubmit}>
        {questionType === "aptitude" ? (
          <>
            <input type="text" name="id" placeholder="Question ID" onChange={handleInputChange} required />
            <input type="text" name="question" placeholder="Question" onChange={handleInputChange} required />
            <input type="text" name="options" placeholder="Options (comma separated)" onChange={handleInputChange} required />
            <input type="text" name="correctAnswer" placeholder="Correct Answer" onChange={handleInputChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleInputChange} required />
            <input type="text" name="difficulty" placeholder="Difficulty" onChange={handleInputChange} required />
            <textarea name="explanation" placeholder="Explanation" onChange={handleInputChange} required />
          </>
        ) : (
          <>
            <input type="text" name="id" placeholder="Question ID" onChange={handleInputChange} required />
            <input type="text" name="title" placeholder="Title" onChange={handleInputChange} required />
            <textarea name="description" placeholder="Description" onChange={handleInputChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleInputChange} required />
            <input type="text" name="difficulty" placeholder="Difficulty" onChange={handleInputChange} required />
            <textarea name="exampleInput" placeholder="Example Input" onChange={handleInputChange} required />
            <textarea name="exampleOutput" placeholder="Example Output" onChange={handleInputChange} required />
            <textarea name="submitInput" placeholder="Submit Input" onChange={handleInputChange} required />
            <textarea name="submitOutput" placeholder="Submit Output" onChange={handleInputChange} required />
            <textarea name="explanation" placeholder="Explanation" onChange={handleInputChange} required />
          </>
        )}
        <button type="submit">Submit Question</button>
      </form>

      {/* Delete Question */}
      <div className="delete-section">
        <h3>Delete Question</h3>
        <input type="text" placeholder="Enter ID to Delete" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button onClick={handleDeleteQuestion}>Delete</button>
      </div>
    </div>
  );
}

export default AddQuestions;
