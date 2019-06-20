import mongoose from "mongoose";
import { userSchema } from "./UserModel";

export const projectSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  assignees: [userSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
