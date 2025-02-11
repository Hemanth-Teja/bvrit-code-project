import express from "express";
import { registerUser } from "../controllers/userController.js";
import { protect } from "../utils/auth.js";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, getUserProfile);
// router.get("/userdata",protect,getUserData);
// router.get("/solvedProblems", protect,solvedProblems);

//   router.post("/markSolved",protect,markSolved);

    export default router;
