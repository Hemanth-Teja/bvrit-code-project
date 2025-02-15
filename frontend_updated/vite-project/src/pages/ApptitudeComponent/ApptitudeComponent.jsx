import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ApptitudeComponent.css";

function AptitudeComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/update/aptitude/questions`);
        const questions = await response.json();
        const currentQuestion = questions.find(q => q.id === id);
        
        if (currentQuestion) {
          // Convert string of options to array if needed
          const optionsArray = Array.isArray(currentQuestion.options) 
            ? currentQuestion.options 
            : currentQuestion.options.split(',').map(opt => opt.trim());

          setQuestion({
            ...currentQuestion,
            options: optionsArray
          });
        } else {
          setError("Question not found");
        }
      } catch (err) {
        setError("Failed to fetch question");
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (selectedOption === question.correctAnswer) {
      setIsCorrect(true);
      try {
        // Update solved status in backend
        await fetch('http://localhost:5000/api/questions/aptitude', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') // Make sure you have the token
          },
          body: JSON.stringify({ problemId: id })
        });

        // Navigate after successful submission
        setTimeout(() => {
          navigate("/practice");
        }, 1500);
      } catch (error) {
        console.error("Error updating solved status:", error);
      }
    } else {
      setIsCorrect(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading question...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <i className="fas fa-exclamation-circle"></i>
      <p>{error}</p>
    </div>
  );

  if (!question) return (
    <div className="error-container">
      <i className="fas fa-question-circle"></i>
      <p>Question not found</p>
    </div>
  );

  return (
    <div className="aptitude-container">
      <div className="question-box">
        <div className="question-header">
          <h2>{question.title}</h2>
          <div className="question-meta">
            <span className="category">
              <i className="fas fa-folder"></i> {question.category}
            </span>
            <span className={`difficulty difficulty-${question.difficulty.toLowerCase()}`}>
              <i className="fas fa-signal"></i> {question.difficulty}
            </span>
          </div>
        </div>

        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
            >
              <span className="option-marker">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        <button
          className={`submit-button ${isCorrect !== null ? (isCorrect ? "correct" : "incorrect") : ""}`}
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          <i className={`fas ${isCorrect === null ? 'fa-paper-plane' : (isCorrect ? 'fa-check' : 'fa-times')}`}></i>
          {isCorrect === null ? 'Submit Answer' : (isCorrect ? 'Correct!' : 'Try Again')}
        </button>

        {isCorrect !== null && (
          <div className={`feedback-section ${isCorrect ? 'success' : 'error'}`}>
            {isCorrect ? (
              <>
                <p className="success-text">
                  <i className="fas fa-check-circle"></i> Excellent! That's the correct answer!
                </p>
                <div className="explanation">
                  <h3><i className="fas fa-lightbulb"></i> Explanation</h3>
                  <p>{question.explanation}</p>
                </div>
              </>
            ) : (
              <p className="error-text">
                <i className="fas fa-times-circle"></i> Incorrect! Please try again.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AptitudeComponent;
