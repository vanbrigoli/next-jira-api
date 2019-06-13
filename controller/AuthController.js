import jwt from "jsonwebtoken";

import UserModel from "../model/UserModel";
import key from "../config/key";
import * as response from "../utils/commonResponse";

const authenticate = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }, function(err, user) {
    if (err) {
      return response.serverErrorResponse(res, {
        message: "Error in finding user."
      });
    }

    if (!user) {
      return response.notFoundError(res, { message: "User not found." });
    } else {
      if (user.comparePassword(password)) {
        const token = jwt.sign({ userId: user.id }, key.secretKey);

        return response.successResponse(res, {
          user,
          accessToken: token
        });
      } else
        return response.badRequest(res, { message: "Invalid email/password." });
    }
  });
};

export default { authenticate };
