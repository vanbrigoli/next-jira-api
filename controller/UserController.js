import UserModel from "../model/UserModel";
import Mailer from "../services/emailService";
import appConfig from "../config/app";
import * as response from "../utils/commonResponse";

/**
 * Email configuration
 */
const emailer = new Mailer({
  host: appConfig.mailerHost,
  port: appConfig.mailerPort,
  user: appConfig.mailerUser,
  pass: appConfig.mailerPass
});

const PROJECTION = "email role firstName lastName position image";

const postUser = async (req, res) => {
  const { email, password, role } = req.body;

  const user = new UserModel();

  user.password = password;
  user.email = email;
  user.role = role;

  user.save(function(err) {
    if (err) {
      if (err.code && err.code === 11000)
        return response.badRequest(res, { message: "User already exist." });
      return response.serverErrorResponse(res, {
        message: "Error in saving user."
      });
    }

    let userObj = user.toJSON();
    delete userObj["password"];

    /**
     * Send email to email
     */
    const mailOptions = {
      from: '"Custom JIRA Team"<custom-jira@custom.com>',
      to: user.email,
      subject: "Custom JIRA Account",
      html: "<p>Sample email</p>"
    };

    emailer.sendMail(mailOptions);

    return response.createdResponse(res, userObj);
  });
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
