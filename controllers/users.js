import userModel from "../models/users.js";
import auth from "../common/auth.js";
import { randString } from "../common/helper.js";

const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find(
      { role: "User" },
      { firstName: 1, lastName: 1, email: 1, userId: 1, role: 1, _id: 0 }
    );
    res.status(200).send({
      message: "Data fetch success",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const signup = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await auth.hashPassword(req.body.password);
      req.body.userId = randString(6);

      await userModel.create(req.body);
      res.status(201).send({
        message: "user create successfully",
      });
    } else {
      res.status(400).send({
        message: `This Email ${req.body.email}alrady Exists `,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      if (await auth.hashCompare(req.body.password, user.password)) {
        let payload = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          userId: user.userId,
        };
        let token = await auth.createToken(payload);
        res.status(200).send({
          message: "Login Successfull",
          token,
          role: user.role,
          userId: user.userId,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: `User does not exists`,
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
  getAllUsers,
  login,
  signup,
};
