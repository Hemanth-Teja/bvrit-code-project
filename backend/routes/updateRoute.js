import express from "express";
import { 
  addDSAQuestion, 
  deleteDSAQuestion, 
  addAptitudeQuestion, 
  deleteAptitudeQuestion,
  getDSAQuestions,
  getAptitudeQuestions,
  getDSAQuestionById
} from "../controllers/updateController.js";

const router = express.Router();

// ✅ Route to add a DSA question
router.post("/dsa/add", addDSAQuestion);

// ✅ Route to delete a DSA question
router.delete("/dsa/delete/:id", deleteDSAQuestion);

// ✅ Route to add an Aptitude question
router.post("/aptitude/add", addAptitudeQuestion);

// ✅ Route to delete an Aptitude question
router.delete("/aptitude/delete/:id", deleteAptitudeQuestion);

// New routes to fetch questions
router.get("/dsa/questions", getDSAQuestions);
router.get("/dsa/question/:id", getDSAQuestionById);
router.get("/aptitude/questions", getAptitudeQuestions);

export default router;