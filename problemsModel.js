let mongoose = require("mongoose");
let problemsSchema = mongoose.Schema({
  pName: { type: String, required: true },
  pType: { type: String, required: true },
  pDescrition: { type: String, required: true },
  pPriority: { type: String, required: true },
  pImage: { type: String, required: true },
  PAddress: { type: String, required: true },
});

let probelmsCollections = mongoose.model("problems", problemsSchema);

// exports

module.exports = probelmsCollections;
