import College from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const { branch, year, student } = req.body;
        if (!branch || !year || !student?.username || !student?.email || !student?.password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let college = await College.findOne();
        if (!college) {
            college = new College();
        }

        if (!college.branches.get(branch)) {
            college.branches.set(branch, { years: new Map() });
        }

        if (!college.branches.get(branch).years.get(year)) {
            college.branches.get(branch).years.set(year, { students: [] });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(student.password, 10);
        student.password = hashedPassword;

        college.branches.get(branch).years.get(year).students.push(student);
        await college.save();

        // Generate JWT Token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is missing" });
        }

        const token = jwt.sign(
            { userId: student.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({ message: "Student added successfully", student, token });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Failed to add student", error: error.message });
    }
};

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
