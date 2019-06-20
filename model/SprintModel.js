import mongoose from "mongoose";
import { projectSchema } from "./ProjectModel";

export const sprintSchema = mongoose.Schema({
  name: String,
  description: String,
  project: projectSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const SprintModel = mongoose.model("Sprint", sprintSchema);

export default SprintModel;
