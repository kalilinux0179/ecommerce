import { AdminAuth } from "../../Model/Admin/Auth.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { username, email, password } = await req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    } else {
      const adminExists = await AdminAuth.findOne({ username });
      if (adminExists) {
        return res
          .status(400)
          .json({ message: "Username is already in use.", success: false });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await AdminAuth.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
        return res.status(201).json({
          message: "Account created successfully",
          success: true,
          admin,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = await req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    } else {
      const adminExists = await AdminAuth.findOne({ username });
      if (!adminExists) {
        return res
          .status(404)
          .json({ message: "Invalid credentials", success: false });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          adminExists.password
        );
        if (!passwordMatch) {
          return res
            .status(404)
            .json({ message: "Invalid credentials", success: false });
        } else {
          let userData = {
            _id: adminExists._id,
            username: adminExists.username,
            email: adminExists.email,
          };
          const tokenData = {
            userId: adminExists._id,
            username: adminExists.username,
          };
          const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          return res
            .status(200)
            .cookie("token", jwtToken, {
              httpOnly: true,
              sameSite: "strict",
              secure: true,
              maxAge: 1 * 24 * 60 * 60 * 1000,
            })
            .json({
              message: `Welcome Back ${adminExists.username}`,
              success: true,
              user: userData,
            });
        }
      }
    }
  } catch (error) {
    console.log(first);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const logOut = async (_, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 0,
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
