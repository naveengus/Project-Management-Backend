import express from "express";
import usersController from "../controllers/users.js";
import verify from "../midleware/verify.js";
// import verifyAdmin from "../midleware/verifyAdmin.js";
const router = express.Router();

router.get("/getAllUsers", verify, usersController.getAllUsers);
router.post("/login", usersController.login);
router.post("/signup", usersController.signup);
router.post("/forgotPassword", usersController.forgotPassword);
router.post("/resetPassword", usersController.resetPassword);

export default router;
