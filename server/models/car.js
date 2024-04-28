const { mongoose, Schema } = require("mongoose");

const car_schema = new Schema(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    plate_no: {
      type: String,
      required: true,
    },
    seats_available: {
      type: Number,
      required: true,
    },
    airbags: {
      type: Number,
    },
    transmission: {
      type: String,
      enum: ["mannual", "automatic"],
      default: "mannual",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.Car = mongoose.model("Car", car_schema);
