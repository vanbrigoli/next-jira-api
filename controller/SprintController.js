import * as response from "../utils/commonResponse";
import SprintModel from "../model/SprintModel";
import ProjectModel from "../model/ProjectModel";

const postSprint = (req, res) => {
  const newSprint = SprintModel(req.body);

  newSprint.save(async err => {
    if (err) {
      if (err.code && err.code === 11000)
        return response.badRequest(res, {
          message: "Sprint already exist."
        });
      return response.serverErrorResponse(res, {
        message: "Error in saving sprint."
      });
    }

    try {
      const project = await ProjectModel.findByIdAndUpdate(
        req.body.projectId,
        {
          $push: { sprints: newSprint._id }
        },
        { new: true }
      ).populate("sprints");

      return response.createdResponse(res, project);
    } catch (error) {
      return response.serverErrorResponse(res, {
        message: "Error in finding and updating project."
      });
    }
  });
};
const getSprint = async (req, res) => {
  const { sprintId } = req.params;
  try {
    const sprint = await SprintModel.findById(sprintId)
      .populate("pending")
      .populate("ongoing")
      .populate("complete");

    return response.successResponse(res, sprint);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting sprint."
    });
  }
};
const getSprints = async (req, res) => {
  const { page = 1, sort = -1, limit = 100, projectId } = req.query;
  let query = {};
  if (projectId) {
    query = { projectId: { _id: projectId } };
  }

  try {
    const sprints = await SprintModel.paginate(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: parseInt(sort) },
      populate: {
        path: "pending",
        path: "ongoing",
        path: "complete"
      }
    });

    return response.successResponse(res, sprints);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting sprints."
    });
  }
};
const patchSprint = async (req, res) => {
  const { sprintId } = req.params;

  try {
    const updatedSprint = await SprintModel.findByIdAndUpdate(
      sprintId,
      req.body,
      {
        new: true
      }
    )
      .populate("pending")
      .populate("ongoing")
      .populate("complete");

    return response.successResponse(res, updatedSprint);
  } catch (error) {
    console.error(error);
    if (error.code && error.code === 11000)
      return response.badRequest(res, {
        message: "Sprint already exist."
      });
    return response.serverErrorResponse(res, {
      message: "Error in updating sprint."
    });
  }
};
const deleteSprint = async (req, res) => {
  const { sprintId } = req.params;

  try {
    await SprintModel.findByIdAndDelete(sprintId);

    return response.successResponse(res, {
      message: "Successfully deleted sprint."
    });
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in deleting sprint."
    });
  }
};

export default { postSprint, getSprint, getSprints, patchSprint, deleteSprint };
