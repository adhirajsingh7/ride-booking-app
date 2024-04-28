const { default: mongoose } = require("mongoose");
const lib = require("../lib");
const { BookRide } = require("../models/book_ride");
const { Car } = require("../models/car");
const { User } = require("../models/user");
const { PublishRide } = require("../models/publish_ride");

exports.get_all_published_rides = async (req, res, next) => {
  try {
    const response = await PublishRide.find({})
      .populate("car_details")
      .populate("rider_details");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_published_ride_by_id = async (req, res, next) => {
  const { published_ride_id } = req.params;
  try {
    const response = await PublishRide.findById(published_ride_id);
    //   .populate("car_details")
    //   .populate("rider_details")
    //   .populate("user_details");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.publish_ride = async (req, res, next) => {
  // rider should be same as user_id
  // status of any publish-ride of user_id should be inactive
  const { user_id } = req.params;

  const {
    start_location = "",
    drop_off_locations = [],
    destination = "end",
    car_details = "",
    rider_details = "",
    fare = 0,
    seats_available = 4,
    passengers = [],
  } = req.body;
  //   console.log(car_details);

  try {
    const user_has_booked_ride = await BookRide.find().populate({
      path: "user_details",
      match: {
        _id: user_id,
        status: "active",
      },
    });

    if (
      (Array.isArray(user_has_booked_ride) &&
        user_has_booked_ride.length > 0) ||
      user_has_booked_ride.user_details
    ) {
      return res
        .status(400)
        .json({ message: "User has already booked a ride" });
    }

    // return res.status(200).send("Sadasdas");

    let payload = {
      start_location,
      drop_off_locations,
      destination,
      car_details,
      rider_details,
      fare,
      seats_available,
      passengers,
    };

    const publish_ride = await PublishRide.create(payload);

    return res.status(200).send(publish_ride);
  } catch (error) {
    console.log(error);
  }
};

exports.update_published_ride = async (req, res, next) => {
  const { user_id, published_ride_id } = req.params;
  const ride_object = req.body;
  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const response = await PublishRide.findOneAndUpdate(
      { _id: published_ride_id },
      ride_object
    );
    res.status(200).json({ message: "Published ride updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.cancel_published_ride = async (req, res, next) => {
  const { user_id, published_ride_id } = req.params;

  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const response = await PublishRide.findOneAndUpdate(
      { _id: published_ride_id },
      { status: "inactive" }
    );
    res.status(200).json({ message: "Ride updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_published_ride = async (req, res, next) => {
  const { published_ride_id } = req.params;
  try {
    const response = await PublishRide.findOneAndDelete({
      _id: published_ride_id,
    });
    res.status(200).json({ message: "Published ride deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.join_published_ride = async (req, res, next) => {

  // also add this to user rides history

  const { user_id, published_ride_id } = req.params;

  try {
 
    const published_ride = await PublishRide.findById(published_ride_id);
    if(!published_ride) return res.status(404).json({message: "Published ride not found"});

    // adding passagener to published ride
    if(published_ride.seats_available === 0){
      return res.status(400).json({message: "Cannot add more passengers"});
    }

    const is_user_already_present = published_ride.passengers.indexOf(user_id);
    if(is_user_already_present !== -1){
      return res.status(400).json({message: "User already present in ride"});
    }
    published_ride.passengers.push(user_id)
    published_ride.seats_available = published_ride.seats_available - 1;
    published_ride.save();
    console.log(published_ride)
    return res.status(200).json({message: "Ride joined successully!"});
  } catch (error) {
    console.log(error);
  }
};



