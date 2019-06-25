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

const PROJECTION =
  "email role firstName lastName position image createdAt updatedAt";

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
      else if (err.name && err.name === "ValidationError") {
        return response.badRequest(res, {
          message: Object.values(err.errors)[0].message
        });
      }
      return response.serverErrorResponse(res, {
        message: "Error in saving user."
      });
    }

    let userObj = user.toJSON();
    delete userObj["password"];

    /**
     * Send email to user email - only if production
     */
    if (process.env.ENV === "production") {
      const mailOptions = {
        from: '"Custom JIRA Team"<custom-jira@custom.com>',
        to: user.email,
        subject: "Custom JIRA Account",
        html: "<p>Sample email</p>"
      };
      emailer.sendMail(mailOptions);
    }

    return response.createdResponse(res, userObj);
  });
};

const getUsers = async (req, res) => {
  const { page = 1, sort = -1, limit = 10 } = req.query;

  try {
    const users = await UserModel.paginate(
      { email: { $ne: req.user.email } },
      {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: parseInt(sort) },
        select: PROJECTION
      }
    );

    return response.successResponse(res, {
      users: users.docs,
      page: users.page,
      total: users.total,
      limit: users.limit,
      pages: users.pages
    });
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
      select: PROJECTION,
      runValidators: true
    });

    return response.successResponse(res, updatedUser);
  } catch (error) {
    if (error.code && error.code === 11000)
      return response.badRequest(res, { message: "User already exist." });
    else if (error.name && error.name === "ValidationError") {
      return response.badRequest(res, {
        message: Object.values(error.errors)[0].message
      });
    } else console.error(error);
    return response.serverErrorResponse(res, {
      message: "Error in updating user."
    });
  }
};

export default { postUser, getUsers, getUser, deleteUser, patchUser };
