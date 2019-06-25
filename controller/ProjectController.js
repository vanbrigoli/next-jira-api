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
    project.slug = name
      .toLowerCase()
      .split(" ")
      .join("_");

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
  const { page = 1, sort = -1, limit = 10, user } = req.query;
  let query = {};
  if (user) {
    query = { assignees: { _id: user } };
  }
  try {
    const projects = await ProjectModel.paginate(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: parseInt(sort) },
      populate: { path: "assignees", select: USER_PROJECTION }
    });

    return response.successResponse(res, projects);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting projects."
    });
  }
};

const getProject = async (req, res) => {
  const { slug } = req.params;
  try {
    const project = await ProjectModel.find({ slug }).populate(
      "assignees",
      USER_PROJECTION
    );

    return response.successResponse(res, project);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting project."
    });
  }
};

const patchProject = async (req, res) => {
  const { projectId } = req.params;

  if ("name" in req.body) {
    req.body.slug = req.body.name
      .toLowerCase()
      .split(" ")
      .join("_");
  }

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    ).populate("assignees", USER_PROJECTION);

    return response.successResponse(res, updatedProject);
  } catch (error) {
    if (error.code && error.code === 11000)
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

export default {
  postProject,
  getProjects,
  patchProject,
  deleteProject,
  getProject
};
