import express from "express";
import tlCreateProject from "../controllers/tlCreateProject.js";
import verify from "../midleware/verify.js";
import verifyAdmin from "../midleware/verifyAdmin.js";
const router = express.Router();

router.get(
  "/getAllProject",
  verify,
  verifyAdmin,
  tlCreateProject.getAllProject
);
router.get(
  "/getAllApprovedProject",
  verify,
  tlCreateProject.getAllApprovedProject
);

router.get(
  "/getAllProjectByUserId",
  verify,
  tlCreateProject.getAllProjectByUserId
);
router.get(
  "/getProjectById/:projectId",
  verify,
  tlCreateProject.getProjectById
);

router.delete(
  "/deleteProject/:projectId",
  verify,
  tlCreateProject.deleteProject
);

router.post("/createProject", verify, tlCreateProject.createProject);
router.put(
  "/changStatus/:projectId",
  verify,
  verifyAdmin,
  tlCreateProject.changStatus
);
export default router;
