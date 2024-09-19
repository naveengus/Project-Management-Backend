import { mongoose } from "./index.js";
const { Schema } = mongoose;

const UserProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, "blogId is required"],
    },
    userId: {
      type: String,
      required: [true, "User Id is required"],
    },
    projectTitle: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    submissionDetails: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Rejected"],
        message: "{VALUE} is not supported",
      },
      default: "Pending",
    },
  },
  {
    collection: "Userprojects",
    versionKey: false,
  }
);

const UserprojectModel = new mongoose.model("Userprojects", UserProjectSchema);

export default UserprojectModel;

// submittedAt: { type: Date, default: Date.now },

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const ProjectSubmissionSchema = new Schema(
//   {
//     projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true }, // Reference to the project
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user submitting
//     submissionDetails: { type: String, required: true }, // Progress or report submitted by the user
//     submittedAt: { type: Date, default: Date.now }, // Automatically adds the submission time
//     status: { type: String, default: "Pending" }, // Status of the submission (Pending, Approved, etc.)
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// const ProjectSubmission = mongoose.model(
//   "ProjectSubmission",
//   ProjectSubmissionSchema
// );
// module.exports = ProjectSubmission;
