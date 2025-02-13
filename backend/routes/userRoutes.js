import express from "express";
<<<<<<< HEAD
import { registerUser } from "../controllers/userController.js";
=======
import { registerUser,loginUser,getUserProfile} from "../controllers/userController.js";
>>>>>>> 1ad8ec6 (frontend_updated file added)
import { protect } from "../utils/auth.js";

const router = express.Router();

router.post("/register", registerUser);
<<<<<<< HEAD
// router.post("/login", loginUser);
// router.get("/profile", protect, getUserProfile);
// router.get("/userdata",protect,getUserData);
// router.get("/solvedProblems", protect,solvedProblems);

//   router.post("/markSolved",protect,markSolved);

    export default router;
=======
router.post("/login", loginUser);
router.get("/profile",  getUserProfile);

export default router;
>>>>>>> 1ad8ec6 (frontend_updated file added)
