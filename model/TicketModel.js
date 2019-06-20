import mongoose from "mongoose";
import { userSchema } from "./UserModel";
import { sprintSchema } from "./SprintModel";

const ticketSchema = mongoose.Schema({
  description: String,
  sprint: sprintSchema,
  title: String,
  assignedTo: userSchema,
  type: { type: String, enum: ["TASK", "DEFECT", "BUG", "TECH DEBT"] },
  status: { type: String, enum: ["PENDING", "ONGOING", "COMPLETE"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
