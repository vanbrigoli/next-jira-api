// get an instance of mongoose and mongoose.Schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String
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
