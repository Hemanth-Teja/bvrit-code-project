import express from "express";


<<<<<<< HEAD
import { addQuestion, getQuestions} from "../controllers/questionController.js";

import { protect, admin } from "../utils/auth.js";

const router = express.Router();

router.post("/", protect, admin, addQuestion); // Only admin can add questions
router.get("/", getQuestions); // Anyone can fetch questions
=======
import { getBranchData ,updateApptitude,updateDsa,getUserData} from "../controllers/questionController.js";

// import { protect, admin } from "../utils/auth.js";

const router = express.Router();
router.get("/userdata",getUserData);
router.get("/userdata/:branch", getBranchData);
router.post("/dsa",updateDsa);
router.post("/apptitude",updateApptitude);
>>>>>>> 1ad8ec6 (frontend_updated file added)

export default router;
