const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    full_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      pincode: String,
      state: String,
      city: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    total_trips: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

user_schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

user_schema.methods.is_password_correct = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.User = mongoose.model("User", user_schema);
