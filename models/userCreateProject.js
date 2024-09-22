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
