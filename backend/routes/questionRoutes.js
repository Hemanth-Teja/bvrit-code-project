import express from "express";


import { addQuestion, getQuestions} from "../controllers/questionController.js";

import { protect, admin } from "../utils/auth.js";

const router = express.Router();

router.post("/", protect, admin, addQuestion); // Only admin can add questions
router.get("/", getQuestions); // Anyone can fetch questions

export default router;
