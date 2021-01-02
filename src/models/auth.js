const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      max: 255,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      max: 255,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      indexe: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

authSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

authSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

authSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", authSchema);
