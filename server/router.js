import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Server is up and running!</h1>");
});

export default router