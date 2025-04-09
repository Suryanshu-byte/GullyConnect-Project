let probelmsCollections = require("./../model/problemsModel");

exports.getAllProblem = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find();
    res.json({ status: true, data: data });
  } catch (e) {
    res.json({ status: false, error: e });
  }
  next();
};

exports.uploads = async (req, res, next) => {
  try {
    await probelmsCollections.create(req.body);
    res.json({ status: true, message: "uploaded" });
  } catch (error) {
    res.json({ status: false, error: error });
  }

  next();
};

exports.getElectricityProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Electricity" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getWaterLoggingProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Water Logging" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getCleanlinessProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Cleanliness" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getWaterSupplyProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Water Supply" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getAnimalShelterProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Animal Shelter" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getRoadConditionsProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Road Condition" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getStreetLightsProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Street Lights" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
exports.getMunicipalOfficeProblems = async (req, res, next) => {
  try {
    let data = await probelmsCollections.find({ pType: "Municipal Office" });
    res.json({ status: true, data });
  } catch (error) {
    res.json({ status: false, message: "please login" });
  }

  next();
};
