const router = require("express").Router();
const { car_controller } = require("../controllers");
const { upload } = require("../middlewares/multer.middleware");

router.route("/").get(car_controller.get_available_cars);

router
  .route("/:car_id")
  .get(car_controller.get_car_by_id)
  .delete(car_controller.delete_car);

router
  .route("/:user_id")
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    car_controller.add_car
  );

router.route("/:user_id/:car_id").put(car_controller.update_car);

module.exports = router;
