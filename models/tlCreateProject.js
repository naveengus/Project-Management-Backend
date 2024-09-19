import { mongoose } from "./index.js";
const { Schema } = mongoose;
const TlProjectSchema = new mongoose.Schema(
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
    deadline: { type: Date, required: true },
    submissionDetails: { type: String, required: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedUsers: [{ type: String, required: true }],
    // assignedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Rejected"],
        message: "{VALUE} is not supported",
      },
      default: "Approved",
    },
  },
  {
    collection: "Tlprojects",
    versionKey: false,
  }
);

const TlprojectModel = new mongoose.model("Tlprojects", TlProjectSchema);

export default TlprojectModel;
