import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Numbers", "Percentages", "Profit & Loss", 
      "Time & Work", "Time & Distance", "Ratio & Proportion", 
      "Permutation & Combination", "Probability", "Data Interpretation"
    ]
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  explanation: {
    type: String,
    required: true
  }
});

const Aptitude = mongoose.model("Aptitude", aptitudeSchema);
export default Aptitude;
