const router = require("express").Router();
const { publish_ride_controller } = require("../controllers");

router.route("/").get(publish_ride_controller.get_all_published_rides);

router.route("/:user_id").post(publish_ride_controller.publish_ride);

router
  .route("/:published_ride_id")
  .get(publish_ride_controller.get_published_ride_by_id)
  .delete(publish_ride_controller.delete_published_ride);

router
  .route("/:user_id/:published_ride_id")
  .put(publish_ride_controller.update_published_ride);
router
  .route("/:user_id/:published_ride_id")
  .patch(publish_ride_controller.cancel_published_ride);

// join published ride
router
  .route("/join-published-ride/:user_id/:published_ride_id")
  .get(publish_ride_controller.join_published_ride);

module.exports = router;
