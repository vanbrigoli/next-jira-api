// get an instance of mongoose and mongoose.Schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import mongoosePaginate from "mongoose-paginate";

// define the schema for our user model
export const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  image: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: value => {
      return isEmail(value);
    }
  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date
});

//middleware
userSchema.pre("save", function(next) {
  let user = this;
  let now = Date.now();

  user.updatedAt = now;
  if (!user.createdAt) {
    user.createdAt = now;
  }

  user.password = user.generateHash(user.password);
  next();
});

userSchema.pre("update", function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
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

userSchema.plugin(mongoosePaginate);

// create the model for users and expose it to our app
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
