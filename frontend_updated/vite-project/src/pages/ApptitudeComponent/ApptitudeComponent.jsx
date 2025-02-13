import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const questionsData = {
  1: {
    question: "What is the sum of 256 and 98?",
    options: ["354", "346", "360", "368"],
    correctAnswer: "354",
    category: "Arithmetic",
    difficulty: "Easy",
    explanation: "Simple addition: 256 + 98 = 354."
  }
};

function AptitudeComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questionsData[id];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    setShowQuestion(true);
  }, [id]);

  const handleSubmit = () => {
    if (selectedOption === question.correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => {
        navigate("/practice/apptitude");
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  if (!showQuestion || !question) return null;

  return (
    <div className="aptitude-fullscreen">
      <div className="question-box">
        <h2>{question?.question}</h2>
        <div className="options-container">
          {question?.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className={`submit-button ${isCorrect ? "correct" : ""}`}
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit
        </button>
        {isCorrect === false && <p className="error-text">Incorrect! Try again.</p>}
      </div>
    </div>
  );
}

export default AptitudeComponent;
