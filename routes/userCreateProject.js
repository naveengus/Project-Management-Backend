import express from "express";
import userCreateProject from "../controllers/userCreateProject.js";
import verify from "../midleware/verify.js";
// import verifyAdmin from "../midleware/verifyAdmin.js";
const router = express.Router();

router.get("/getAllSubmit", verify, userCreateProject.getAllSubmit);
router.post("/createSubmit", verify, userCreateProject.createSubmit);
router.get(
  "/getAllUserProjectByUserId",
  verify,
  userCreateProject.getAllUserProjectByUserId
);
router.get("/getAllApprovedUser", verify, userCreateProject.getAllApprovedUser);
router.get(
  "/getUserProjectById/:projectId",
  verify,
  userCreateProject.getUserProjectById
);
router.put(
  "/changStatusSubmit/:projectId",
  verify,
  userCreateProject.changStatusSubmit
);
export default router;
