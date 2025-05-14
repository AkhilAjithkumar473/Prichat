import express from "express";
import { register, login } from "./authController.js";
import { authenticateJWT } from "./authMiddleware.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Server is up and running!</h1>");
});

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

// Example protected route
router.get("/api/protected", authenticateJWT, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

export default router