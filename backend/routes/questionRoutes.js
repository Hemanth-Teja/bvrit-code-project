import express from "express";
import { getBranchData ,updateApptitude,updateDsa,getUserData} from "../controllers/questionController.js";

const router = express.Router();


router.get("/userdata",getUserData);
router.get("/userdata/:branch", getBranchData);
router.post("/dsa",updateDsa);
router.post("/aptitude",updateApptitude);

export default router;
