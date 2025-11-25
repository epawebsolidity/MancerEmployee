import express from "express";
import { claimAllowcationEmploye, createAllowcationEmploye, getAllowcationEmploye, getSalaryBalanceEmploye } from "../controllers/salaryControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Route: GET employees (Protected Route)
router.post("/", verifyToken, createAllowcationEmploye);
router.get("/:id_employe", verifyToken, getAllowcationEmploye);
router.post("/reward", verifyToken, claimAllowcationEmploye);
router.get("/", verifyToken, getSalaryBalanceEmploye);



export default router;
