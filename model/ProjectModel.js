import mongoose from "mongoose";

export const projectSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
