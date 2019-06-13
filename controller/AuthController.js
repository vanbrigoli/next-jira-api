import jwt from "jsonwebtoken";

import UserModel from "../model/UserModel";
import key from "../config/key";
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
          userId: user.id,
          email: user.email,
          role: user.role,
          permissions: [user.role]
        };
        const token = jwt.sign(payload, key.secretKey);

        return response.successResponse(res, {
          user: { id: user.id, email: user.email, role: user.role },
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

export default { authenticate };
