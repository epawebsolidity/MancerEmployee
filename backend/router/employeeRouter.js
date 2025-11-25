import express from "express";
import { getEmployees, getEmployeesUsersJoin, getJoinEmployeByUserId } from "../controllers/employeeController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Route: GET employees (Protected Route)
router.get("/", verifyToken, getEmployees);
router.get("/:id_users", verifyToken, getJoinEmployeByUserId);
router.get("/join", verifyToken, getEmployeesUsersJoin);

export default router;
