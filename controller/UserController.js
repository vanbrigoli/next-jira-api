import UserModel from "../model/UserModel";
import Mailer from "../services/emailService";
import appConfig from "../config/app";
import * as response from "../utils/commonResponse";

const emailer = new Mailer("gmail", {
  user: appConfig.mailerUser,
  pass: appConfig.mailerPass
});

const PROJECTION = "email role firstName lastName position image";

const postUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const user = new UserModel();

      user.password = password;
      user.email = email;
      user.role = role;

      user.save(function(err) {
        if (err)
          return response.serverErrorResponse(res, {
            message: "Error in saving user."
          });

        let userObj = user.toJSON();
        delete userObj["password"];
        
        /** 
         * const mailOptions = {
          from: "sender@email.com",
          to: user.email,
          subject: "Custom JIRA Account",
          html: "<p>Sample email</p>"
        };

        emailer.sendMail(mailOptions);
        */

        return response.createdResponse(res, userObj);
      });
    } else return response.badRequest(res, { message: "User already exist." });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in finding user."
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      { email: { $ne: req.user.email } },
      PROJECTION
    );

    return response.successResponse(res, { users });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting users."
    });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId, PROJECTION);

    return response.successResponse(res, user);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting user."
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.findByIdAndDelete(userId);

    return response.successResponse(res, {
      message: "Successfully deleted user."
    });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in deleting user."
    });
  }
};

const patchUser = async (req, res) => {
  const { userId } = req.params;

  if (req.body && "role" in req.body) {
    if (req.user.role !== "admin")
      return response.unAuthorizedRequest(res, {
        message: "Unauthorized to update user role."
      });
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      select: PROJECTION
    });

    return response.successResponse(res, updatedUser);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in updating user."
    });
  }
};

export default { postUser, getUsers, getUser, deleteUser, patchUser };
