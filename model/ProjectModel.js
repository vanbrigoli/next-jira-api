import mongoose from "mongoose";

export const projectSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: Date,
  updatedAt: Date
});

projectSchema.pre("save", function(next) {
  let project = this;

  project.updatedAt = now;
  if (!project.createdAt) {
    project.createdAt = now;
  }

  next();
});

projectSchema.pre("update", function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
