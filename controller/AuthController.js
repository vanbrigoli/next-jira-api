import jwt from "jsonwebtoken";

import UserModel from "../model/UserModel";
import appConfig from "../config/app";
import * as response from "../utils/commonResponse";

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.notFoundError(res, { message: "User not found." });
    } else {
      if (user.comparePassword(password)) {
        const payload = {
          userId: user._id,
          email: user.email,
          role: user.role,
          permissions: [user.role]
        };
        const token = jwt.sign(payload, appConfig.secretKey);

        const userObj = user.toJSON();
        delete userObj["password"];

        return response.successResponse(res, {
          user: userObj,
          accessToken: token
        });
      } else
        return response.badRequest(res, { message: "Invalid email/password." });
    }
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in finding user."
    });
  }
};

const changePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      if (user.comparePassword(password))
        return response.badRequest(res, {
          message: "Old and new password must be different."
        });
      else {
        user.password = password;
        user.save(err => {
          if (err)
            return response.serverErrorResponse(res, {
              message: "Error in updating password."
            });

          return response.successResponse(res, {
            message: "Successfully updated password."
          });
        });
      }
    } else {
      return response.badRequest(res, { message: "User not found." });
    }
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in changing password."
    });
  }
};

export default { authenticate, changePassword };
