let express = require("express");
let authorizationRouter = express.Router();
let AuthorizationController = require("./../controller/authorizationController");
// routings-users
authorizationRouter.route("/register").post(AuthorizationController.Register);
authorizationRouter.route("/login").post(AuthorizationController.Login);

authorizationRouter
  .route("/authorization")
  .post(AuthorizationController.Authorization);
// exports
module.exports = authorizationRouter;
