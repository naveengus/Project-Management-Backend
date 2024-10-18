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

const forgotPassword = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const generateOTP = () => {
        const char = "0123456789";
        return Array.from(
          { length: 6 },
          () => char[Math.floor(Math.random() * char.length)]
        ).join("");
      };

      const OTP = generateOTP();
      await userModel.updateOne(
        { email: req.body.email },
        {
          $set: {
            resetPasswordOtp: OTP,
            resetPasswordExpires: Date.now() + 3600000,
          },
        }
      );
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: "Password Reset",
        html: `<div>
                <p>Dear ${user.firstName} ${user.lastName}</p>
                <p>We received a request to reset your password. Here is your One Time Password (OTP):<strong>${OTP}</strong></p>
                <p>Thank You</p>
                <p>${user.firstName} ${user.lastName}</p>
              </div>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password Reset email Sent" });
    } else {
      res.status(400).send({
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { OTP, password } = req.body;
    const user = await userModel.findOne({
      resetPasswordOtp: OTP,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      const message = user ? "OTP Expired" : "Invalid OTP";
      return res.status(404).send({ message });
    }

    const hashPassword = await auth.hashPassword(password);

    await userModel.updateOne(
      { resetPasswordOtp: OTP },
      {
        $set: {
          password: hashPassword,
          resetPasswordOtp: null,
          resetPasswordExpires: null,
        },
      }
    );
    res.status(200).send({
      message: "Password changed Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  getAllUsers,
  login,
  signup,
  forgotPassword,
  resetPassword,
};
