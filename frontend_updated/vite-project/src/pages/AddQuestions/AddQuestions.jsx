import React, { useState } from "react";
import { toast } from 'react-toastify';
import "./AddQuestions.css";
import { useNavigate } from "react-router-dom";

const dsaCategories = [
  "Arrays", "Linked List", "Stack", "Queue", "Recursion", "Sorting", 
  "Graphs", "Trees", "Dynamic Programming", "Greedy", "Bit Manipulation", 
  "Backtracking"
];

const aptitudeCategories = [
  "Numbers", "Percentages", "Profit & Loss", "Time & Work", 
  "Time & Distance", "Ratio & Proportion", "Permutation & Combination", 
  "Probability", "Data Interpretation"
];

function AddQuestions() {
  const navigate = useNavigate();
  if(localStorage.getItem("isAdmin") !== "true"){
    toast.error("You are not authorized to access this page.");
    navigate("/home");
  }

  const [questionType, setQuestionType] = useState("dsa");
  const [formData, setFormData] = useState({});
  const [deleteId, setDeleteId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = questionType === 'dsa' 
        ? 'http://localhost:5000/api/update/dsa/add' 
        : 'http://localhost:5000/api/update/aptitude/add';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Question added successfully!');
        e.target.reset();
        setFormData({});
      } else {
        toast.error(data.message || 'Failed to add question');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!deleteId.trim()) {
      toast.warning('Please enter a question ID');
      return;
    }
  
    try {
      const endpoint = questionType === 'dsa' 
        ? `http://localhost:5000/api/update/dsa/delete/${deleteId}` 
        : `http://localhost:5000/api/update/aptitude/delete/${deleteId}`;
      
      const response = await fetch(endpoint, { method: 'DELETE' });
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Question deleted successfully!');
        setDeleteId(''); // Clear the input field after successful deletion
      } else {
        toast.error(data.message || 'Failed to delete question');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete question. Please try again.');
    }
  };

  return (
    <div className="add-questions-container">
      <h2>Question Management</h2>
      
      <div className="selection">
        <label>
          <i className="fas fa-book"></i> Question Type:
        </label>
        <select 
          onChange={(e) => setQuestionType(e.target.value)} 
          value={questionType}
        >
          <option className="question-type-option" value="dsa">DSA</option>
          <option className="question-type-option" value="aptitude">Aptitude</option>
        </select>
      </div>

      <form className="question-form" onSubmit={handleFormSubmit}>
        {questionType === "aptitude" ? (
          <>
            <input type="text" name="id" placeholder="Question ID" onChange={handleInputChange} required />
            <input type="text" name="title" placeholder="Question Title" onChange={handleInputChange} required />
            <select name="category" onChange={handleInputChange} required>
              <option value="">Select Category</option>
              {aptitudeCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input type="text" name="options" placeholder="Options (comma separated)" onChange={handleInputChange} required />
            <input type="text" name="correctAnswer" placeholder="Correct Answer" onChange={handleInputChange} required />
            <select name="difficulty" onChange={handleInputChange} required>
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <textarea name="explanation" placeholder="Explanation" onChange={handleInputChange} required />
          </>
        ) : (
          <>
            <input type="text" name="id" placeholder="Question ID" onChange={handleInputChange} required />
            <input type="text" name="title" placeholder="Question Title" onChange={handleInputChange} required />
            <textarea name="description" placeholder="Description" onChange={handleInputChange} required />
            <select name="category" onChange={handleInputChange} required>
              <option value="">Select Category</option>
              {dsaCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select name="difficulty" onChange={handleInputChange} required>
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <textarea name="exampleInput" placeholder="Example Input" onChange={handleInputChange} required />
            <textarea name="exampleOutput" placeholder="Example Output" onChange={handleInputChange} required />
            <textarea name="submitInput" placeholder="Submit Input" onChange={handleInputChange} required />
            <textarea name="submitOutput" placeholder="Submit Output" onChange={handleInputChange} required />
            <textarea name="explanation" placeholder="Explanation" onChange={handleInputChange} required />
          </>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Question...' : 'Add Question'}
        </button>
      </form>

      <div className="delete-section">
  <h3>Delete Question</h3>
  <div className="delete-section-input">
    <input 
      type="text" 
      placeholder="Enter Question ID" 
      value={deleteId} 
      onChange={(e) => setDeleteId(e.target.value)} 
    />
    <button type="button" className="delete-button" onClick={handleDeleteQuestion}>
      <i className="fas fa-trash-alt"></i> Delete Question
    </button>
  </div>
</div>
    </div>
  );
}

export default AddQuestions;
