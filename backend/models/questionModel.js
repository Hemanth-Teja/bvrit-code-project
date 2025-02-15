import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Arrays", "Linked List", "Stack", "Queue", "Recursion", 
      "Sorting", "Graphs", "Trees", "Dynamic Programming", 
      "Greedy", "Bit Manipulation", "Backtracking"
    ]
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  exampleInput: {
    type: String,
    required: true
  },
  exampleOutput: {
    type: String,
    required: true
  },
  submitInput: {
    type: String,
    required: true
  },
  submitOutput: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
