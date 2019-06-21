import * as response from "../utils/commonResponse";
import ProjectModel from "../model/ProjectModel";

const USER_PROJECTION =
  "email role firstName lastName position image createdAt updatedAt";

const postProject = (req, res) => {
  const { name, description, assignees } = req.body;

  try {
    const project = new ProjectModel();
    project.name = name;
    project.description = description;
    project.assignees = assignees;

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

const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find({}, null, {
      sort: { createdAt: -1 }
    }).populate("assignees", USER_PROJECTION);

    return response.successResponse(res, projects);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting projects."
    });
  }
};

const patchProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    ).populate("assignees", USER_PROJECTION);

    return response.successResponse(res, updatedProject);
  } catch (error) {
    if (err.code && err.code === 11000)
      return response.badRequest(res, {
        message: "Project already exist."
      });
    return response.serverErrorResponse(res, {
      message: "Error in updating project."
    });
  }
};

const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    await ProjectModel.findByIdAndDelete(projectId);

    return response.successResponse(res, {
      message: "Successfully deleted project."
    });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in deleting project."
    });
  }
};

export default { postProject, getProjects, patchProject, deleteProject };
