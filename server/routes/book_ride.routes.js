const router = require("express").Router();
const { book_ride_controller } = require("../controllers");

router.route("/").get(book_ride_controller.get_all_booked_rides);

router.route("/:user_id").post(book_ride_controller.create_book_ride);

router
  .route("/:ride_id")
  .get(book_ride_controller.get_book_ride_by_id)
  .delete(book_ride_controller.delete_book_ride);

router.route("/:user_id/:ride_id").put(book_ride_controller.update_book_ride);
router.route("/:user_id/:ride_id").patch(book_ride_controller.cancel_book_ride);

module.exports = router;
