// import { randString } from "../common/helper.js";
// import projectModel from "../models/project.js";

// const getAllProject = async (req, res) => {
//   try {
//     let project = await projectModel.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "userId",
//           as: "user_details",
//         },
//       },
//       {
//         $project: {
//           projectId: 1,
//           projectTitle: 1,
//           technologies: 1,
//           description: 1,
//           deadline: 1,
//           firstName: "$user_details.firstName",
//           lastName: "$user_details.lastName",
//         },
//       },
//       { $unwind: "$firstName" },
//       { $unwind: "$lastName" },
//       {
//         $project: {
//           projectId: 1,
//           projectTitle: 1,
//           technologies: 1,
//           description: 1,
//           deadline: 1,
//           name: { $concat: ["$firstName", " ", "$lastName"] },
//         },
//       },
//     ]);
//     res.status(200).send({
//       message: "Data Fetch Successfully",
//       data: project,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Internal Server Error",
//       error,
//     });
//   }
// };
// const getAllApprovedProject = async (req, res) => {
//   try {
//     let project = await projectModel.aggregate([
//       {
//         $match: { status: "Approved" },
//       },

//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "userId",
//           as: "user_details",
//         },
//       },
//       {
//         $project: {
//           projectId: 1,
//           projectTitle: 1,
//           technologies: 1,
//           description: 1,
//           firstName: "$user_details.firstName",
//           lastName: "$user_details.lastName",
//         },
//       },
//       { $unwind: "$firstName" },
//       { $unwind: "$lastName" },
//       {
//         $project: {
//           projectId: 1,
//           projectTitle: 1,
//           technologies: 1,
//           description: 1,
//           name: { $concat: ["$firstName", " ", "$lastName"] },
//         },
//       },
//     ]);
//     res.status(200).send({
//       message: "Data Fetch Successfully",
//       data: project,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Internal Server Error",
//       error,
//     });
//   }
// };
// const createProject = async (req, res) => {
//   try {
//     req.body.projectId = randString(8);
//     req.body.userId = req.headers.userId;
//     await projectModel.create(req.body);
//     res.status(201).send({
//       message: "project create succussefully",
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Internal Server Error",
//       error,
//     });
//   }
// };

// const changStatus = async (req, res) => {
//   try {
//     let { projectId } = req.params;
//     let project = await projectModel.findOne({ projectId: projectId });
//     if (project) {
//       project.status = req.body.status;
//       project.save();
//       res.status(200).send({
//         message: "project Updated success",
//       });
//     } else {
//       res.status(400).send({
//         message: "Invalid projectId",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Internal Server Error",
//       error,
//     });
//   }
// };

// export default {
//   getAllProject,
//   getAllApprovedProject,
//   createProject,
//   changStatus,
// };
