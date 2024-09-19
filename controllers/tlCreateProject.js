import { randString } from "../common/helper.js";
import TlprojectModel from "../models/tlCreateProject.js";
import UserprojectModel from "../models/userCreateProject.js";

const getAllProject = async (req, res) => {
  try {
    let project = await TlprojectModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details",
      },
      {
        $project: {
          projectId: 1,
          projectTitle: 1,
          technologies: 1,
          description: 1,
          submissionDetails: 1,
          deadline: 1,
          status: 1,
          name: {
            $concat: ["$user_details.firstName", " ", "$user_details.lastName"],
          },
        },
      },
    ]);

    res.status(200).send({
      message: "Data Fetch Successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getAllProjectByUserId = async (req, res) => {
  try {
    let project = await TlprojectModel.find({ userId: req.headers.userId });

    res.status(200).send({
      message: "Data Fetch Successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const createProject = async (req, res) => {
  try {
    req.body.projectId = randString(8);
    req.body.userId = req.headers.userId;
    await TlprojectModel.create(req.body);
    res.status(201).send({
      message: "project create succussefully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const changStatus = async (req, res) => {
  try {
    let { projectId } = req.params;
    let project = await TlprojectModel.findOne({ projectId: projectId });
    if (project) {
      project.status = req.body.status;
      project.save();
      res.status(200).send({
        message: "project Updated success",
      });
    } else {
      res.status(400).send({
        message: "Invalid projectId",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getAllApprovedProject = async (req, res) => {
  try {
    let project = await TlprojectModel.aggregate([
      {
        $match: { status: "Approved" },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details",
      },
      {
        $project: {
          projectId: 1,
          projectTitle: 1,
          technologies: 1,
          submissionDetails: 1,
          description: 1,
          assignedUsers: 1,
          deadline: 1,
          name: {
            $concat: ["$user_details.firstName", " ", "$user_details.lastName"],
          },
        },
      },
    ]);

    res.status(200).send({
      message: "Data Fetch Successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    let project = await TlprojectModel.findOne({
      projectId: req.params.projectId,
    });
    if (project) {
      res.status(200).send({
        message: "Project fetched successfully",
        data: project,
      });
    } else {
      res.status(404).send({
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const [deletedProject, deletedUserProject] = await Promise.all([
      TlprojectModel.findOneAndDelete({ projectId }),
      UserprojectModel.findOneAndDelete({ projectId }),
    ]);

    if (!deletedProject && !deletedUserProject) {
      return res.status(404).send({
        message: "Project not found",
      });
    }
    res.status(200).send({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  createProject,
  getAllProject,
  changStatus,
  getAllApprovedProject,
  getAllProjectByUserId,
  getProjectById,
  deleteProject,
};
