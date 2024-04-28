const { mongoose, Schema } = require("mongoose");

const book_ride_schema = new Schema(
  {
    pickup_location: {
      type: String,
      required: true,
    },
    drop_off_location: {
      type: String,
      required: true,
    },
    car_details: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    rider_details: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_details: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
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

exports.BookRide = mongoose.model("BookRide", book_ride_schema);
