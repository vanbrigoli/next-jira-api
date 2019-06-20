// get an instance of mongoose and mongoose.Schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// define the schema for our user model
export const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  image: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

//middleware
userSchema.pre("save", function(next) {
  let user = this;

  user.password = user.generateHash(user.password);
  next();
});

// methods
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// compare passwords
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
