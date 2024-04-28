const { mongoose, Schema } = require("mongoose");

const publish_ride_schema = new Schema(
  {
    start_location: {
      type: String,
      required: true,
    },
    drop_off_locations: [
      {
        drop_off: {
          type: String,
        },
        fare: {
          type: Number,
        },
      },
    ],
    destination: {
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
    fare: {
      type: Number,
      required: true,
    },
    seats_available: {
      type: Number,
      required: true,
    },
    passengers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

exports.PublishRide = mongoose.model("PublishRide", publish_ride_schema);
