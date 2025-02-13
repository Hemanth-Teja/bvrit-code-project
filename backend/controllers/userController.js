import College from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
<<<<<<< HEAD

        const { branch, year, student } = req.body;
=======
        const { branch, year, student } = req.body;

>>>>>>> 1ad8ec6 (frontend_updated file added)
        if (!branch || !year || !student?.username || !student?.email || !student?.password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let college = await College.findOne();
<<<<<<< HEAD
        if (!college) {
            college = new College();
        }

=======
        if (!college) college = new College();

        // Check across all branches and years for existing email or ID
        let isExistingStudent = false;
        college.branches.forEach((branchData) => {
            branchData.years.forEach((yearData) => {
                if (yearData.students.some(s => s.email === student.email || s.id === student.id)) {
                    isExistingStudent = true;
                }
            });
        });

        if (isExistingStudent) {
            return res.status(409).json({ message: "Student with this email or ID already exists" });
        }

        // Ensure branch and year exist
>>>>>>> 1ad8ec6 (frontend_updated file added)
        if (!college.branches.get(branch)) {
            college.branches.set(branch, { years: new Map() });
        }

<<<<<<< HEAD
        if (!college.branches.get(branch).years.get(year)) {
            college.branches.get(branch).years.set(year, { students: [] });
=======
        const yearStr = String(year);
        if (!college.branches.get(branch).years.get(yearStr)) {
            college.branches.get(branch).years.set(yearStr, { students: [] });
>>>>>>> 1ad8ec6 (frontend_updated file added)
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(student.password, 10);
        student.password = hashedPassword;

<<<<<<< HEAD
        college.branches.get(branch).years.get(year).students.push(student);
        await college.save();

        // Generate JWT Token
=======
        // Add student
        college.branches.get(branch).years.get(yearStr).students.push(student);
        await college.save();

>>>>>>> 1ad8ec6 (frontend_updated file added)
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is missing" });
        }

        const token = jwt.sign(
<<<<<<< HEAD
            { userId: student.id },
=======
            { userId: student.id, email: student.email, branch, year: yearStr },
>>>>>>> 1ad8ec6 (frontend_updated file added)
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

<<<<<<< HEAD
        res.status(201).json({ message: "Student added successfully", student, token });
=======
        res.status(201).json({ 
            message: "Student added successfully", 
            student, 
            token 
        });

>>>>>>> 1ad8ec6 (frontend_updated file added)
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Failed to add student", error: error.message });
    }
};

<<<<<<< HEAD
// export const getUserData=async(req,res)=>{
//          try{
//           let data=await User.find({});
//           res.json({info:data ,id:req.user._id})
//          }
//          catch(err){
//           console.log("error")
//           res.json({message:"error"})
//          }
// }
// export const markSolved = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (!user.problems_solved.includes(req.body.problemId)) {
//             user.problems_solved.push(req.body.problemId);
//             await user.save();
//         }
//         res.status(200).json({ message: "Problem marked as solved", solvedProblems: user.problems_solved });
//     } catch (error) {
//         console.error("Error marking problem as solved:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

//  export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   res.json({ token, userId: user._id, username: user.username });
// };

// export const solvedProblems=async(req,res)=>{
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({ message: "The solved problms", solvedproblems: user.problems_solved });
//     } catch (error) {
//         console.error("Error marking problem as solved:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// }

//  export const getUserProfile = async (req, res) => {
//   console.log("req"+req)
//   const user = await User.findById(req.user._id).select("-password");
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json(user);
// };
=======
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Validate email format
        if (!email.endsWith("@bvrit.ac.in")) {
            return res.status(400).json({ message: "Email must end with '@bvrit.ac.in'." });
        }

        // Fetch the college document
        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: "No college data found." });
        }

        // Find student across all branches and years
        let foundStudent = null;
        let foundBranch = null;
        let foundYear = null;

        for (const [branchName, branchData] of college.branches.entries()) {
            for (const [year, yearData] of branchData.years.entries()) {
                const student = yearData.students.find((s) => s.email === email);
                if (student) {
                    foundStudent = student;
                    foundBranch = branchName;
                    foundYear = year;
                    break;
                }
            }
            if (foundStudent) break;
        }

        if (!foundStudent) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, foundStudent.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is missing in environment variables." });
        }

        const token = jwt.sign(
            { userId: foundStudent.id, email: foundStudent.email, branch: foundBranch, year: foundYear },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Send full student data in response
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            student: {
                username: foundStudent.username,
                id: foundStudent.id,
                email: foundStudent.email,
                contact_no: foundStudent.contact_no,
                parent_contact_no: foundStudent.parent_contact_no,
                aptitude_solved: foundStudent.aptitude_solved,
                dsa_solved: foundStudent.dsa_solved,
                labs: foundStudent.labs,
                branch: foundBranch,
                year: foundYear
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};



export const getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, email, branch, year } = decoded;

        // Ensure all required fields exist
        if (!userId || !email || !branch || !year) {
            return res.status(400).json({ message: "Invalid token data" });
        }

     
        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: "No college data found" });
        }

   
        let matchedBranch = null;
        college.branches.forEach((branchData, dbBranch) => {
            if (dbBranch.toLowerCase() === branch.toLowerCase()) {
                matchedBranch = branchData;
            }
        });

        if (!matchedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        // Find year
        const yearData = matchedBranch.years.get(String(year));
        if (!yearData) {
            return res.status(404).json({ message: "Year not found in this branch" });
        }

        // Find user
        const foundStudent = yearData.students.find(student => 
            student.id === userId && student.email === email
        );

        if (!foundStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        const studentsData = yearData.students.map(student => ({
            name: student.username,
            id: student.id,
            email: student.email,
            aptitude_solved: student.aptitude_solved,
            dsa_solved: student.dsa_solved,
        }));

        res.status(200).json({ 
            message: "Profile fetched successfully",
            user: foundStudent, 
            students: studentsData 
        });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Failed to retrieve profile", error: error.message });
    }
};

>>>>>>> 1ad8ec6 (frontend_updated file added)
