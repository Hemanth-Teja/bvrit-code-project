<<<<<<< HEAD
import Question from "../models/questionModel.js";


export const addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: "Failed to add question", error });
  }
};

export const getQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
=======
import College from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUserData = async (req, res) => {
  try {
      const colleges = await College.find();

      if (!colleges || colleges.length === 0) {
          return res.status(404).json({ message: "No students found" });
      }

      let studentsData = [];

      colleges.forEach((college) => {
          college.branches.forEach((branchData, branch) => {
              branchData.years.forEach((yearData, year) => {
                  yearData.students.forEach((student) => {
                      studentsData.push({
                          name: student.username,
                          id: student.id,
                          branch: branch,
                          aptitude_solved: student.aptitude_solved,
                          dsa_solved: student.dsa_solved
                      });
                  });
              });
          });
      });

      res.status(200).json(studentsData);
  } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to retrieve students", error: error.message });
  }
};
export const getBranchData = async (req, res) => {
  try {
      const { branch } = req.params;
      if (!branch) {
          return res.status(400).json({ message: "Branch is required" });
      }

      // Convert branch to lowercase
      const branchLower = branch.toLowerCase();

      // Fetch college data
      const college = await College.findOne();
      if (!college) {
          return res.status(404).json({ message: "No college data found" });
      }

      // Convert database branch names to lowercase and find the matching branch
      let matchedBranch = null;
      college.branches.forEach((branchData, dbBranch) => {
          if (dbBranch.toLowerCase() === branchLower) {
              matchedBranch = branchData;
          }
      });

      if (!matchedBranch) {
          return res.status(404).json({ message: "Branch not found" });
      }

      let studentsData = [];

      matchedBranch.years.forEach((yearData) => {
          yearData.students.forEach((student) => {
              studentsData.push({
                  name: student.username,
                  id: student.id,
                  branch: branch, // Use the requested branch name
                  aptitude_solved: student.aptitude_solved,
                  dsa_solved: student.dsa_solved
              });
          });
      });

      if (studentsData.length === 0) {
          return res.status(404).json({ message: "No students found in this branch" });
      }

      res.status(200).json(studentsData);
  } catch (error) {
      console.error("Error fetching branch data:", error);
      res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
};
export const updateDsa = async (req, res) => {
  try {
      const { problemId } = req.body; // Get problem ID from the request body
      const token = req.headers.authorization; // Get token from headers

      if (!token) {
          return res.status(401).json({ message: "Not authorized, no token provided" });
      }

      if (!problemId) {
          return res.status(400).json({ message: "Problem ID is required" });
      }

      // Verify the token and extract student details
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email, branch, year } = decoded;

      // Fetch the college document
      const college = await College.findOne();
      if (!college) {
          return res.status(404).json({ message: "No college data found." });
      }

      // Find the student in the college database
      const yearStr = String(year);
      const studentsArray = college.branches.get(branch)?.years.get(yearStr)?.students;
      
      if (!studentsArray) {
          return res.status(404).json({ message: "Branch or year not found." });
      }

      const student = studentsArray.find(s => s.email === email);
      if (!student) {
          return res.status(404).json({ message: "Student not found." });
      }

      // Update dsa_solved array
      if (!student.dsa_solved.includes(problemId)) {
          student.dsa_solved.push(problemId);
      } else {
          return res.status(400).json({ message: "Problem already solved." });
      }

      // Save the updated college document
      await college.save();

      res.status(200).json({ 
          message: "Problem added to dsa_solved list successfully", 
          student: student
      });

  } catch (error) {
      console.error("Error updating dsa_solved:", error);
      res.status(500).json({ message: "Failed to update dsa_solved", error: error.message });
  }
};
export const updateApptitude = async (req, res) => {
    try {
        const { problemId } = req.body; // Get problem ID from the request body
        const token = req.headers.authorization; // Get token from headers

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }

        if (!problemId) {
            return res.status(400).json({ message: "Problem ID is required" });
        }

        // Verify the token and extract student details
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, branch, year } = decoded;

        // Fetch the college document
        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: "No college data found." });
        }

        // Find the student in the college database
        const yearStr = String(year);
        const studentsArray = college.branches.get(branch)?.years.get(yearStr)?.students;

        if (!studentsArray) {
            return res.status(404).json({ message: "Branch or year not found." });
        }

        const student = studentsArray.find(s => s.email === email);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // ✅ Ensure apptitude_solved is initialized
        if (!Array.isArray(student.apptitude_solved)) {
            student.apptitude_solved = [];
        }

        console.log("Current apptitude_solved:", student.apptitude_solved);

        if (!student.apptitude_solved.includes(problemId)) {
            student.apptitude_solved.push(problemId);
        } else {
            return res.status(400).json({ message: "Problem already solved." });
        }

        // Save the updated college document
        await college.save();

        res.status(200).json({ 
            message: "Problem added to apptitude_solved list successfully", 
            student: student
        });

    } catch (error) {
        console.error("Error updating Apptitude_solved:", error);
        res.status(500).json({ message: "Failed to update Apptitude_solved", error: error.message });
    }
>>>>>>> 1ad8ec6 (frontend_updated file added)
};
