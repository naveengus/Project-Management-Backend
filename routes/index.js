import express from "express";
import usersRoutes from "./users.js";
// import projectRoutes from "./project.js";
import tlRoutes from "./tlCreateProject.js";
import submitRoutes from "./userCreateProject.js";

const router = express.Router();

router.get("/", (req, res) =>
  res.send("<h1>project tracker</h1><p>well come, Its working Good</p>")
);
router.use("/users", usersRoutes);
router.use("/project", tlRoutes);
router.use("/userproject", submitRoutes);

export default router;
