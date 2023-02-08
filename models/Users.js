import mongoose from "mongoose";
var url = "https://i.stack.imgur.com/34AD2.jpg";
const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Full name required?"] },
  phone: { type: String, required: [true, "Phone number required?"] },
  email: { type: String, required: [true, "email required?"] },
  password: { type: String, required: [true, "password required?"] },
  profilePic: { type: String, default: url },
  isAdmin: { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);
export default User;
