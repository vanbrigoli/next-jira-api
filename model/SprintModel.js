import mongoose from "mongoose";

export const sprintSchema = mongoose.Schema({
  name: String,
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const SprintModel = mongoose.model("Sprint", sprintSchema);

export default SprintModel;
