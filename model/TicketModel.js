import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const ticketSchema = mongoose.Schema({
  description: String,
  sprint: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
  title: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["TASK", "DEFECT", "BUG", "TECH DEBT"] },
  status: { type: String, enum: ["PENDING", "ONGOING", "COMPLETE"] },
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
