let express = require("express");
let app = express();
let cors = require("cors");
let authorizationRouter = require("./routes/authorizationRoutes");
let problemsRouter = require("./routes/problemsRoutes");
// middleware
app.use(express.json());
app.use(cors());

// routers
app.use("/app/v1/users", authorizationRouter);
app.use("/app/v1/userProblems", problemsRouter);
//exports

module.exports = app;
