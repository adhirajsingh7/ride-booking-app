const lib = require("../lib");
const { BookRide } = require("../models/book_ride");
const { Car } = require("../models/car");
const { PublishRide } = require("../models/publish_ride");
const { User } = require("../models/user");

exports.get_all_booked_rides = async (req, res, next) => {
  const {user_id} = req.query;
  console.log('user_id: ', user_id);
  
  
  try {
    const response = await BookRide.find({})
      .populate("car_details")
      .populate("rider_details")
      .populate("user_details")

      // .populate({path: "user_details", match: {_id: user_id}}).select("user_details");


    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_book_ride_by_id = async (req, res, next) => {
  const { ride_id } = req.params;
  try {
    const response = await BookRide.findById(ride_id)
      .populate("car_details")
      .populate("rider_details")
      .populate("user_details");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_book_ride = async (req, res, next) => {
  // car_id (owner_id) should not be same as user_id
  // status of any publish-ride of user_id should be inactive
  const { user_id } = req.params;

  const {
    pickup_location = "",
    drop_off_location = "",
    car_details = "",
    rider_details = "",
    fare = 0,
    rating = 0,
  } = req.body;
  //   console.log(car_details);

  try {
    const car_owner = await Car.findOne({
      _id: car_details,
    }).populate({ path: "owner_id", select: "_id" });

    if (!car_owner) {
      return res.status(404).json({ message: "Invalid car details" });
    }

    // edge case
    if (car_owner.owner_id._id == user_id) {
      return res
        .status(400)
        .json({ message: "Same car owner cannot book his own ride" });
    }
    //   console.log(is_booking_owner_same)

    // status of any publish-ride of user_id should be inactive
    const user_has_published_ride = await PublishRide.find().populate({
      path: "rider_details",
      match: {
        _id: user_id,
        status: "active",
      },
    });
    console.log(user_has_published_ride);
    if (
      (Array.isArray(user_has_published_ride) &&
        user_has_published_ride.length > 0) ||
      user_has_published_ride.rider_details
    ) {
      return res
        .status(400)
        .json({ message: "User has already published a ride" });
    }

    let payload = {
      pickup_location,
      drop_off_location,
      car_details,
      rider_details,
      user_details: user_id,
      fare,
      rating,
    };

    const book_user_ride = await BookRide.create(payload);

    return res.status(200).send(book_user_ride);
  } catch (error) {
    console.log(error);
  }
};

exports.update_book_ride = async (req, res, next) => {
  const { user_id, ride_id } = req.params;
  const ride_object = req.body;
  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const response = await BookRide.findOneAndUpdate(
      { _id: ride_id },
      ride_object
    );
    res.status(200).json({ message: "Ride updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.cancel_book_ride = async (req, res, next) => {
  const { user_id, ride_id } = req.params;

  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const response = await BookRide.findOneAndUpdate(
      { _id: ride_id },
      { status: "inactive" }
    );
    res.status(200).json({ message: "Ride updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_book_ride = async (req, res, next) => {
  const { ride_id } = req.params;
  try {
    const response = await BookRide.findOneAndDelete({ _id: ride_id });
    res.status(200).json({ message: "Ride booking deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
