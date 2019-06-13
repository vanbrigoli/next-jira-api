import UserModel from "../model/UserModel";
import * as response from "../utils/commonResponse";

const postUser = (req, res) => {
  const { email, password, role } = req.body;

  UserModel.findOne({ email }, function(err, user) {
    if (err) {
      return response.serverErrorResponse(res, "Error in finding user.");
    }

    if (!user) {
      const user = new UserModel();

      user.password = user.generateHash(password);
      user.email = email;
      user.role = role;

      user.save(function(err) {
        if (err)
          return response.serverErrorResponse(res, "Error in saving user.");

        return response.createdResponse(res, "Successfully created user.");
      });
    } else return response.badRequest(res, "User already exist.");
  });
};

export default { postUser };
