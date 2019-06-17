import UserModel from "../model/UserModel";
import * as response from "../utils/commonResponse";

const postUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const user = new UserModel();

      user.password = user.generateHash(password);
      user.email = email;
      user.role = role;

      user.save(function(err) {
        if (err)
          return response.serverErrorResponse(res, {
            message: "Error in saving user."
          });

        return response.createdResponse(res, {
          message: "Successfully created user."
        });
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
      { role: { $ne: "admin" } },
      "email role"
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
    const user = await UserModel.findById(userId, "email role");

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

export default { postUser, getUsers, getUser, deleteUser };
