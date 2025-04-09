let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
});

//preBuiltMethod
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// methods
userSchema.methods.checkPass = function (currPass, dbPass) {
  return bcrypt.compare(currPass, dbPass);
};

//exports

let userCollection = mongoose.model("Users", userSchema);

module.exports = userCollection;
