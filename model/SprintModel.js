import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const sprintSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

sprintSchema.pre("save", function(next) {
  let sprint = this;
  let now = Date.now();

  sprint.updatedAt = now;
  if (!sprint.createdAt) {
    sprint.createdAt = now;
  }

  next();
});

sprintSchema.pre("update", function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

sprintSchema.plugin(mongoosePaginate);

const SprintModel = mongoose.model("Sprint", sprintSchema);

export default SprintModel;
