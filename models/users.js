import { mongoose } from "./index.js";
import { validateEmail, validateMobile } from "../common/validation.js";

const usersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User Id is required"],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["User", "Admin"],
        message: "{VALUE} is not supported",
      },
    },
    resetPasswordOtp: { type: Number },
    resetPasswordExpires: { type: Date },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

const userModel = new mongoose.model("users", usersSchema);

export default userModel;
