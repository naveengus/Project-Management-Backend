// import { mongoose } from "./index.js";

// const projectSchema = new mongoose.Schema(
//   {
//     projectId: {
//       type: String,
//       required: [true, "blogId is required"],
//     },
//     userId: {
//       type: String,
//       required: [true, "User Id is required"],
//     },
//     projectTitle: {
//       type: String,
//       required: [true, "Title is required"],
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     technologies: {
//       type: String,
//       required: [true, "technologies is required"],
//     },

//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     status: {
//       type: String,
//       enum: {
//         values: ["Pending", "Approved", "Rejected"],
//         message: "{VALUE} is not supported",
//       },
//       default: "Pending",
//     },
//     deadline: {
//       type: Date,
//       required: [true, "Deadline is required"],
//       validate: {
//         validator: function (value) {
//           return value > this.createdAt;
//         },
//         message: "Deadline must be after the start date",
//       },
//     },
//   },
//   {
//     collection: "projects",
//     versionKey: false,
//   }
// );

// const projectModel = new mongoose.model("projects", projectSchema);

// export default projectModel;
