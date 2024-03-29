import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const ticketSchema = mongoose.Schema({
  description: String,
  sprintId: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
  title: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["task", "defect", "bug", "tech debt"] },
  status: { type: String, enum: ["pending", "ongoing", "complete"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ticketSchema.pre("save", function(next) {
  let ticket = this;
  let now = Date.now();

  ticket.updatedAt = now;
  if (!ticket.createdAt) {
    ticket.createdAt = now;
  }

  next();
});

ticketSchema.pre("update", function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

ticketSchema.plugin(mongoosePaginate);

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
