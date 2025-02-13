import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
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

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        console.log("Fetching problem details for ID:", id);
        const response = {
          data: {
            id: 2,
            title: "Implement a function to sum two numbers.",
            description: "Given two integers, return their sum.",
            category: "Mathematics",
            difficulty: "Easy",
            exampleInput: "3\n5",
            exampleOutput: "8",
            submitInput: "10\n15",
            submitOutput: "25",
            explanation: "Simply add the two numbers and return the result.",
          },
        };
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [id]);

  const languageMap = {
    c: "c",
    cpp: "cpp",
    java: "java",
    python: "python3",
  };

  const executeCode = async (input, expectedOutput, isSubmission) => {
    setOutput("Processing...");
    setIsCorrect(false);

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
          const token = localStorage.getItem("token");
          await axios.post(
            "http://localhost:5000/api/users/markSolved",
            { problemId: problem.id },
            { headers: { Authorization: token } }
          );
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

  if (!problem) return <h2>Loading problem...</h2>;

  return (
    <div className="code-editor-container">
      <div className="problem-panel">
        <h2>{problem.title}</h2>
        <p><strong>Description:</strong> {problem.description}</p>
        <p><strong>Category:</strong> {problem.category}</p>
        <p><strong>Difficulty:</strong> {problem.difficulty}</p>
        <h3>Example</h3>
        <pre><strong>Input:</strong> {problem.exampleInput}</pre>
        <pre><strong>Output:</strong> {problem.exampleOutput}</pre>
        <h3>Explanation</h3>
        <p>{problem.explanation}</p>
      </div>

      <div className="editor-panel">
        <label htmlFor="language">Select Language:</label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <AceEditor
          mode={languageMap[language] || "java"}
          theme="monokai"
          value={code}
          onChange={setCode}
          fontSize={14}
          width="100%"
          height="300px"
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

        <div className="button-group">
          <button onClick={() => executeCode(problem.exampleInput, problem.exampleOutput, false)}>
            Run
          </button>
          <button onClick={() => executeCode(problem.submitInput, problem.submitOutput, true)}>
            Submit
          </button>
        </div>

        <div className="output-section">
          <h3>Output:</h3>
          <pre>{output}</pre>
          {submissionStatus && <p>{submissionStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;