const lib = require("../lib");
const { User } = require("../models/user");
const { Car } = require("../models/car");
const {
  upload_on_cloudinary,
  delete_on_cloudinary,
} = require("../utils/cloudinary");
// const redisClient = require("../config/redis_connection");

// const DEFAULT_EXPIRATION = 3600;

exports.get_available_cars = async (req, res, next) => {
  try {
    //.populate("owner_id");

    // const cached_data = await redisClient.get("cars");
    // if (cached_data) return res.status(200).send(JSON.parse(cached_data));

    const response = await Car.find({}).populate("owner_id");

    // await redisClient.setEx(
    //   "cars",
    //   DEFAULT_EXPIRATION,
    //   JSON.stringify(response)
    // );
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_car_by_id = async (req, res, next) => {
  const { car_id } = req.params;
  try {
    const response = await Car.findById(car_id);
    if (!response) throw new Error("Car not found.");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.add_car = async (req, res, next) => {
  const { user_id } = req.params;
  const {
    brand = "",
    model = "",
    plate_no = "",
    seats_available = 4,
    airbags = 0,
    transmission = "mannual",
  } = req.body;
  console.log(req.body);
  console.log(req.files.image);
  // return res.json({ message: "hey upload car route" });
  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    // upload image
    let image_local_path;
    if (
      req.files &&
      Array.isArray(req.files.image) &&
      req.files.image.length > 0
    ) {
      image_local_path = req.files.image[0].path;
    }

    const image = await upload_on_cloudinary(image_local_path);

    let payload = {
      owner_id: user_id,
      image: image?.url || "",
      brand,
      model,
      plate_no,
      seats_available,
      airbags,
      transmission,
    };

    const car = await Car.create(payload);
    return res.status(201).json(car);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update_car = async (req, res, next) => {
  const { user_id, car_id } = req.params;
  const car = req.body;
  try {
    const user_exists = await User.findById(user_id);
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const response = await Car.findOneAndUpdate({ _id: car_id }, car);
    res.status(200).json({ message: "Car updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_car = async (req, res, next) => {
  const { car_id } = req.params;
  try {
    const car = await Car.findById(car_id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // delete avatar on cloudinary
    const { image } = car;
    const image_public_id = image.split("/").pop().split(".")[0];
    const image_deleted = await delete_on_cloudinary(image_public_id);

    const response = await Car.findOneAndDelete({ _id: car_id });
    res.status(200).json({ message: "Car deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
