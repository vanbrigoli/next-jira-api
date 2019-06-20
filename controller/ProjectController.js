import * as response from "../utils/commonResponse";
import UserModel from "../model/UserModel";
import ProjectModel from "../model/ProjectModel";

const USER_PROJECTION =
  "email role firstName lastName position image createdAt updatedAt";

const postProject = (req, res) => {
  const { name, description, assignees } = req.body;

  try {
    const mappedAssignees = assignees.map(async userId => {
      return await UserModel.findById(userId, USER_PROJECTION);
    });

    const project = new ProjectModel();
    project.name = name;
    project.description = description;
    project.assignees = mappedAssignees;

    project.save(function(err) {
      if (err) {
        if (err.code && err.code === 11000)
          return response.badRequest(res, {
            message: "Project already exist."
          });
        return response.serverErrorResponse(res, {
          message: "Error in saving project."
        });
      }

      return response.createdResponse(res, project);
    });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in finding user."
    });
  }
};

export default { postProject };
