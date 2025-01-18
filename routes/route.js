import express from "express";
import { getAllUsers, register, login } from "../controllers/userController.js";
import { createNoteForUser } from "../controllers/noteController.js";
import { createAirdrop } from "../controllers/airdrop-data/createAirdrop.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/login", login);
router.post("/register", register);

router.post("/create-airdrop", createAirdrop);
router.post("/create-note", createNoteForUser);

export default router;
