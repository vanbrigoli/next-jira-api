import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  description: String,
  sprint: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
  title: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["TASK", "DEFECT", "BUG", "TECH DEBT"] },
  status: { type: String, enum: ["PENDING", "ONGOING", "COMPLETE"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
