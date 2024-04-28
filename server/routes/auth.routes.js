const router = require("express").Router();
const passport = require("passport");

exports.is_authenticated = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/login");
};

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  } else {
    return res.status(401).json({ message: "User not found" });
  }
});

router.get("/login/failed", (req, res) => {
  console.log(req.session.messages);
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.post("/logout", function (req, res, next) {
  res.clearCookie("connect.sid"); // clear the session cookie
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }
    console.log("Logout successful");
    res.status(200).json({ message: "Logout successful" });
  });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/home`,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
