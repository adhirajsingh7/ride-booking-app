const router = require("express").Router();
const { user_controller } = require("../controllers");
const { upload } = require("../middlewares/multer.middleware");

router
  .route("/")
  .get(user_controller.get_users)
  .post(user_controller.create_user);

router
  .route("/:user_id")
  .get(user_controller.get_user_by_id)
  .put(user_controller.update_user)
  .delete(user_controller.delete_user);

// additional routes
router
  .route("/signup")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    user_controller.signup_user
  );
router.route("/login").post(user_controller.login_user);

module.exports = router;
