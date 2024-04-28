const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to ride booking app" });
});

// ride booking app
router.use("/users", require("./user.routes"));
router.use("/cars", require("./car.routes"));
router.use("/book-ride", require("./book_ride.routes"));
router.use("/publish-ride", require("./publish_ride.routes"));

module.exports = router;
