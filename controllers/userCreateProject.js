import { randString } from "../common/helper.js";
import UserprojectModel from "../models/userCreateProject.js";

const createSubmit = async (req, res) => {
  try {
    req.body.projectId = randString(8);
    req.body.userId = req.headers.userId;
    await UserprojectModel.create(req.body);
    res.status(201).send({
      message: "Project Submit Succussefully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getAllSubmit = async (req, res) => {
  try {
    let project = await UserprojectModel.aggregate([
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
          userId: 1,
          projectId: 1,
          projectTitle: 1,
          technologies: 1,
          description: 1,
          status: 1,
          submissionDetails: 1,
          submittedAt: 1,
          ProjectLink: 1,
          name: {
            $concat: ["$user_details.firstName", " ", "$user_details.lastName"],
          },
        },
      },
    ]);

    console.log(project);

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

const changStatusSubmit = async (req, res) => {
  try {
    let { projectId } = req.params;
    let project = await UserprojectModel.findOne({ projectId: projectId });
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

const getAllUserProjectByUserId = async (req, res) => {
  try {
    let project = await UserprojectModel.find({ userId: req.headers.userId });

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

const getAllApprovedUser = async (req, res) => {
  try {
    let project = await UserprojectModel.aggregate([
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
          ProjectLink: 1,
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

const getUserProjectById = async (req, res) => {
  try {
    let project = await UserprojectModel.findOne({
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
export default {
  getAllSubmit,
  createSubmit,
  changStatusSubmit,
  getAllUserProjectByUserId,
  getAllApprovedUser,
  getUserProjectById,
};
