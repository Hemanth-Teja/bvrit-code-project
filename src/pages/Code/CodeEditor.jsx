import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CodeEditor.css";
import questions from "../../data/questions.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const javaCode = `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String input = sc.nextLine();
            System.out.println(input);
        }
    }
}`;

const cppCode = `#include <iostream>
using namespace std;
int main() {
    string input;
    while (getline(cin, input)) {
        cout << input << endl;
    }
    return 0;
}`;

const languageMap = {
    java: "java",
    cpp: "cpp",
};

function CodeEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState(javaCode);
    const [output, setOutput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");

    useEffect(() => {
        const foundProblem = questions.find((q) => q.id === Number(id));
        setProblem(foundProblem);
    }, [id]);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        setCode(selectedLanguage === "java" ? javaCode : cppCode);
    };

    const runCode = async () => {
        setOutput("Processing...");
        setIsCorrect(false);
        
        const input = problem?.exampleInput;
        const expectedOutput = problem?.exampleOutput.trim();

        if (!input || !expectedOutput) {
            setOutput("No test cases available.");
            return;
        }

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
        } catch (error) {
            console.error("Error Details:", error);
            setOutput("Error occurred while processing.");
        }
    };

    const submitCode = async () => {
        setSubmissionStatus("");
        setOutput("Processing...");
    
        const input = problem?.submitInput;
        const expectedOutput = problem?.submitOutput.trim();
        const token = localStorage.getItem("token");
    
        if (!input || !expectedOutput) {
            setOutput("No submission test cases available.");
            return;
        }
    
        try {
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language: languageMap[language],
                version: "*",
                files: [{ content: code }],
                stdin: input,
            });
    
            const receivedOutput = response.data.run.stdout.trim();
            setOutput(receivedOutput || "No output");
    
            if (receivedOutput === expectedOutput) {
                setSubmissionStatus("Submission Successful ✅");
                setIsCorrect(true);
                toast.success("🎉 Submission successful!");
    
                await axios.post(
                    "http://localhost:5000/api/users/markSolved",
                    { problemId: problem.id },
                    { headers: { Authorization: token } }
                );
    
                setTimeout(() => navigate("/practice"), 2000);
            } else {
                setSubmissionStatus("Failed on Backend Test Cases ❌");
                setIsCorrect(false);
                toast.error("❌ Submission failed. Output did not match expected results.");
            }
        } catch (error) {
            console.error("Error:", error);
            setOutput("Error occurred while processing.");
            toast.error("⚠️ Error during submission. Please try again.");
        }
    };
    
    return (
        <div className="code-editor">
            <div className="left-section">
                {problem ? (
                    <>
                        <h2 className="problem-title">{problem.title}</h2>
                        <pre className="desc">Q: {problem.description}</pre>
                        <div className="problem-meta">
                            <div className="meta-badge category">Category: {problem.category}</div>
                            <div className={`meta-badge difficulty ${problem.difficulty.toLowerCase()}`}>
                                Difficulty: {problem.difficulty}
                            </div>
                        </div>
                        {problem.exampleInput && problem.exampleOutput && (
                            <div className="example-section">
                                <h3>Example Input</h3>
                                <pre className="example-box">{problem.exampleInput}</pre>
                                <h3>Example Output</h3>
                                <pre className="example-box">{problem.exampleOutput}</pre>
                                {problem.explanation && <p className="explanation-text">{problem.explanation}</p>}
                            </div>
                        )}
                    </>
                ) : (<p>Problem not found</p>)}
            </div>
            <div className="right-section">
                <div className="editor-header">
                    <label htmlFor="language-select"><strong>Language:</strong></label>
                    <select id="language-select" value={language} onChange={handleLanguageChange} className="language-dropdown">
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} className="code-textarea"></textarea>
                <div className="editor-footer">
                    <button className={`run-btn ${isCorrect ? "green-btn" : ""}`} onClick={runCode}>Run</button>
                    <button className="submit-btn" onClick={submitCode}>Submit</button>
                </div>
                {submissionStatus && <p className={`submission-message ${isCorrect ? "success" : "error"}`}>{submissionStatus}</p>}
                <div className="output-box">
                    <h3>Output</h3>
                    <pre className="output-text">{output}</pre>
                </div>
            </div>
        </div>
    );
}
export default CodeEditor;
