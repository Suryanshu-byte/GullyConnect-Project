let userCollection = require("./../model/userModel");
let jwt = require("jsonwebtoken");
let { promisify } = require("util");
let token = (id) => {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN, {
    expiresIn: process.env.JSON_EXPIRES,
  });
};
exports.Register = async (req, res, next) => {
  try {
    userCollection.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.json({ status: true, message: "successfully registered" });
  } catch (e) {
    res.json({
      status: false,
      message: "oops something went wrong ",
      error: e,
    });
  }
  next();
};

exports.Login = async (req, res, next) => {
  let data = await userCollection.findOne({ username: req.body.username });
  try {
    if (await data.checkPass(req.body.password, data.password)) {
      res.json({ status: true, message: "hi user", token: token(data.id) });
    }
  } catch (e) {
    res.json({
      status: false,
      message: "please enter a valid email or password",
    });
  }
};

exports.Authorization = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[1] == "null" ||
    !req.headers.authorization.startsWith("bearer")
  ) {
    res.json({ status: false, message: "please login again !!" });
  } else {
    let userAccess = promisify(jwt.verify)(
      req.headers.authorization.split(" ")[1],
      process.env.JSON_WEB_TOKEN
    );

    let user = userCollection.findOne({ _id: userAccess.id });

    if (!user) {
      res.json({
        status: false,
        message: "user belonging to this token doesnot exists",
      });
    }

    res.json({ status: true, message: "verified" });
  }
};
