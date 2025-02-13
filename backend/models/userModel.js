<<<<<<< HEAD
=======
// backend/models/userModel.js
>>>>>>> 1ad8ec6 (frontend_updated file added)
import mongoose from "mongoose";

const LabSchema = new mongoose.Schema({
  lab1: [Number],
  lab2: [Number],
  lab3: [Number],
  lab4: [Number]
});

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact_no: { type: String, required: true },
  parent_contact_no: { type: String, required: true },
<<<<<<< HEAD
  aptitude_solved: { type: Number, default: 0 },
  dsa_solved: { type: Number, default: 0 },
=======

  aptitude_solved: { type: [Number], required: false, default: [] },  // Changed to array
  dsa_solved: { type: [Number], required: false, default: [] },       // Changed to array
>>>>>>> 1ad8ec6 (frontend_updated file added)
  labs: { type: LabSchema, default: {} }
});

const YearSchema = new mongoose.Schema({
  students: { type: [StudentSchema], default: [] }
});

const BranchSchema = new mongoose.Schema({
  years: {
    type: Map,
    of: YearSchema,
    default: {
      '2022': {},
      '2023': {},
      '2024': {},
      '2025': {}
    }
  }
});

const CollegeSchema = new mongoose.Schema({
  branches: {
    type: Map,
    of: BranchSchema,
    default: {
      CSE: {},
      IT: {},
      CSD: {}
    }
  }
});

const College = mongoose.model('College', CollegeSchema);
<<<<<<< HEAD

export default College;

=======
export default College;
>>>>>>> 1ad8ec6 (frontend_updated file added)
