let express = require("express");
let problemsRouter = express.Router();
let problemsControllers = require("./../controller/problemsController");
//let authController = require("./../controller/authorizationController");
// routings

problemsRouter
  .route("/problems")
  .get(problemsControllers.getAllProblem)
  .post(problemsControllers.uploads);

// electricity

problemsRouter
  .route("/getElectricityProblems")
  .get(problemsControllers.getElectricityProblems);

// water Logging

problemsRouter
  .route("/getWaterLoggingProblems")
  .get(problemsControllers.getWaterLoggingProblems);

// cleanliness

problemsRouter
  .route("/getCleanlinessProblems")
  .get(problemsControllers.getCleanlinessProblems);

// water Supply

problemsRouter
  .route("/getWaterSupplyProblems")
  .get(problemsControllers.getWaterSupplyProblems);

// Animal Shelter

problemsRouter
  .route("/getAnimalShelterProblems")
  .get(problemsControllers.getAnimalShelterProblems);

// RoadConditions

problemsRouter
  .route("/getRoadConditionsProblems")
  .get(problemsControllers.getRoadConditionsProblems);

// StreetLights

problemsRouter
  .route("/getStreetLightsProblems ")
  .get(problemsControllers.getStreetLightsProblems);

// Municipal Office

problemsRouter
  .route("/getMunicipalOfficeProblems")
  .get(problemsControllers.getMunicipalOfficeProblems);

// exports

module.exports = problemsRouter;
