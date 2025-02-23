import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "./CodeEditor.css";

const CodeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  // Default code templates for each language
  const getDefaultCode = (lang) => {
    switch (lang) {
      case "java":
        return `public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`;
      case "python":
        return `# Write your code here
`;
      case "c":
        return `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`;
      case "cpp":
        return `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`;
      default:
        return "// Write your code here\n";
    }
  };

  // Fetch problem details from the backend
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/update/dsa/question/${id}`
        );
        setProblem(response.data);
        console.log(response.data);
        setCode(getDefaultCode(language)); // Set default code for the selected language
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [id, language]);

  // Map languages to Piston API language codes
  const languageMap = {
    c: "c",
    cpp: "cpp",
    java: "java",
    python: "python3",
  };

  // Execute code using the Piston API
  const executeCode = async (input, expectedOutput, isSubmission) => {
    setOutput("Processing...");
    setIsCorrect(false);
    setSubmissionStatus("");
  
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: languageMap[language],
        version: "*",
        files: [{ content: code }],
        stdin: input,
      });
  
      const receivedOutput = response.data.run.stdout.trim();
      setOutput(receivedOutput || "No output");
      setIsCorrect(receivedOutput === expectedOutput);
  
      if (isSubmission) {
        if (receivedOutput === expectedOutput) {
          setSubmissionStatus("Submission Successful ✅");
  
          // Call the backend to update dsa_solved
          const token = localStorage.getItem("token");
          await axios.post(
            "http://localhost:5000/api/questions/dsa",
            { problemId: problem.id, },
            { headers: { Authorization: token } }
          );
  
          // Redirect after 2 seconds
          setTimeout(() => navigate("/practice"), 2000);
        } else {
          setSubmissionStatus("Failed on Backend Test Cases ❌");
        }
      }
    } catch (error) {
      console.error("Execution error:", error);
      setOutput("Error executing code");
    }
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage)); // Update code to the default template for the new language
  };

  // Show loading state while fetching problem details
  if (!problem) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="code-editor-container">
      {/* Problem Details Panel */}
      <div className="problem-panel">
        <h2>{problem.title}</h2>
        <div className="category-difficulty">
          <span>
            <i className="fas fa-folder"></i> {problem.category}
          </span>
          <span className={`difficulty-${problem.difficulty.toLowerCase()}`}>
            <i className="fas fa-signal"></i> {problem.difficulty}
          </span>
        </div>

        {/* Problem Description */}
        <div className="description-section">
          <h3>
            <i className="fas fa-info-circle"></i> Description
          </h3>
          <p>{problem.description}</p>
        </div>

        {/* Example Input and Output */}
        <div className="example-section">
          <h3>
            <i className="fas fa-lightbulb"></i> Example
          </h3>
          <div className="example-box">
            <div className="input-box">
              <span>Input:</span>
              <pre>{problem.exampleInput}</pre>
            </div>
            <div className="output-box">
              <span>Output:</span>
              <pre>{problem.exampleOutput}</pre>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="explanation-section">
          <h3>
            <i className="fas fa-book"></i> Explanation
          </h3>
          <p>{problem.explanation}</p>
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="editor-panel">
        {/* Language Selector */}
        <div className="language-selector">
          <label htmlFor="language">
            <i className="fas fa-code"></i> Select Language:
          </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>

        {/* Ace Editor */}
        <div className="editor-wrapper">
          <AceEditor
            mode={languageMap[language] || "java"}
            theme="dracula"
            value={code}
            onChange={setCode}
            fontSize={14}
            width="100%"
            height="400px"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              tabSize: 4,
            }}
          />
        </div>

        {/* Run and Submit Buttons */}
        <div className="button-group">
          <button
            className="run-btn"
            onClick={() =>
              executeCode(problem.exampleInput, problem.exampleOutput, false)
            }
          >
            <i className="fas fa-play"></i> Run Code
          </button>
          <button
            className="submit-btn"
            onClick={() =>
              executeCode(problem.submitInput, problem.submitOutput, true)
            }
          >
            <i className="fas fa-paper-plane"></i> Submit
          </button>
        </div>

        {/* Output Section */}
        <div className="output-section">
          <h3>
            <i className="fas fa-terminal"></i> Output
          </h3>
          <pre>{output}</pre>
          {submissionStatus && (
            <p
              className={`status-message ${
                submissionStatus.includes("✅") ? "success" : "error"
              }`}
            >
              {submissionStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;