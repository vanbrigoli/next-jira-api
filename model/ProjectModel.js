import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export const projectSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  slug: { type: String, default: null },
  createdAt: Date,
  updatedAt: Date
});

projectSchema.pre("save", function(next) {
  let project = this;
  let now = Date.now();

  project.updatedAt = now;
  if (!project.createdAt) {
    project.createdAt = now;
  }

  next();
});

projectSchema.pre("update", function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

projectSchema.plugin(mongoosePaginate);

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
