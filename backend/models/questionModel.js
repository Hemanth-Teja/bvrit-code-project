import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Example: "Arrays", "Graphs", "Dynamic Programming"
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  exampleInput: { type: String, required: true },
  exampleOutput: { type: String, required: true },
  explanation: { type: String, required: true },
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
