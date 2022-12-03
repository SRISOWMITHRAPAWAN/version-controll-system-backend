const mongo = require("../connect");
const { ObjectId } = require("mongodb");
module.exports.getEmployees = async (req, res, next) => {
  try {
    const employeesData = await mongo.selecteddb
      .collection("employees")
      .find()
      .toArray();
    res.send(employeesData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.getEmployee = async (req, res, next) => {
  try {
    const id =req.params.id
    console.log(id)
    const employeeData = await mongo.selecteddb
      .collection("employees")
      .findOne({_id:ObjectId(req.params.id)})
      
    res.send(employeeData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.updateEmployees = async (req, res, next) => {
  try {
    console.log("hello")
    const id = req.params.id;
    const updatedData = await mongo.selecteddb
      .collection("employees")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body} },
        { returnDocument: "after" }
      );

    res.send(updatedData);
   
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.createEmployees = async (req, res, next) => {
  try {
    
    console.log(req.body);
    const insertedResponse = await mongo.selecteddb
      .collection("employees")
      .insertOne(req.body);
    res.send(insertedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteEmployees = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selecteddb
      .collection("employees")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
