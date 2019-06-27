import * as response from "../utils/commonResponse";
import TicketModel from "../model/TicketModel";
import SprintModel from "../model/SprintModel";

const USER_PROJECTION =
  "email role firstName lastName position image createdAt updatedAt";

const postTicket = (req, res) => {
  const {
    projectId,
    sprintId,
    title,
    description,
    type,
    assignedTo
  } = req.body;

  const newTicket = new TicketModel();

  newTicket.title = title;
  newTicket.description = description;
  newTicket.projectId = projectId;
  newTicket.sprintId = sprintId;
  newTicket.assignedTo = assignedTo;
  newTicket.type = type;
  newTicket.status = "pending";

  newTicket.save(async err => {
    if (err) {
      return response.serverErrorResponse(res, {
        message: "Error in saving ticket."
      });
    }

    try {
      const sprint = await SprintModel.findByIdAndUpdate(
        newTicket.sprintId,
        {
          $push: { pending: newTicket._id }
        },
        { new: true }
      )
        .populate("pending")
        .populate("ongoing")
        .populate("complete");

      return response.createdResponse(res, sprint);
    } catch (error) {
      return response.serverErrorResponse(res, {
        message: "Error in updating sprint."
      });
    }
  });
};
const getTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await TicketModel.findById(ticketId)
      .populate("projectId")
      .populate("sprintId")
      .populate("assignedTo", USER_PROJECTION);

    return response.successResponse(res, ticket);
  } catch (error) {
    return response.serverErrorResponse(res, {
      message: "Error in getting ticket."
    });
  }
};
const getTickets = async (req, res) => {
  const { projectId, sprintId } = req.query;
  let query = {};
  if (projectId && sprintId) {
    query = {
      $and: [{ projectId: { _id: projectId }, sprintId: { _id: sprintId } }]
    };
  }

  try {
    const tickets = await TicketModel.find(query, null, {
      sort: { createdAt: -1 }
    })
      .populate("projectId")
      .populate("sprintId")
      .populate("assignedTo", USER_PROJECTION);

    return response.successResponse(res, tickets);
  } catch (error) {
    console.error(error);
    return response.serverErrorResponse(res, {
      message: "Error in getting tickets."
    });
  }
};
const patchTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      ticketId,
      req.body,
      {
        new: true
      }
    )
      .populate("projectId")
      .populate("sprintId")
      .populate("assignedTo", USER_PROJECTION);

    return response.successResponse(res, updatedTicket);
  } catch (error) {
    console.error(error);
    if (error.code && error.code === 11000)
      return response.badRequest(res, {
        message: "Sprint already exist."
      });
    return response.serverErrorResponse(res, {
      message: "Error in updating ticket."
    });
  }
};
const deleteTicket = (req, res) => {};

export default { postTicket, getTicket, getTickets, patchTicket, deleteTicket };
