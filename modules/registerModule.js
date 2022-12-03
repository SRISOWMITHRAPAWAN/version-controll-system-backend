const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi=require("joi");

exports.signup = async (req, res, next) => {
 
  console.log(req.body);
  //email id validation
  try {

     //email
  //username
  //password
  //confirm password
  const validation =joi.object({
    name:joi.string().alphanum().min(3).max(25).trim(true).required(),
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(8).trim(true).required(),
    confirmPassword:joi.string().min(8).trim(true).required(),
  });

  const { error } =validation.validate(req.body);
  if(error){
    return res.status(400).send({msg:error.message})
  }
    const existUser = await mongo.selecteddb
      .collection("users")
      .findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).send({ msg: "you are already a register user" });
    }
    const isSamePassword = checkPassword(
      req.body.password,
      req.body.confirmPassword
    );
    if (!isSamePassword)
      return res.status(400).send({ msg: "password doesn't match" });
    else delete req.body.confirmPassword;
    //password encryption
    const randomString = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, randomString);

    //save in db
    const insertedResponse = await mongo.selecteddb
      .collection("users")
      .insertOne({ ...req.body});
    res.send(insertedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const checkPassword = (password, confirmPassword) => {
  return password !== confirmPassword ? false : true;
}; //

///////signin//////////

exports.signin = async (req, res, next) => {
  ////req.body :Email and password
  //Email validation:you are not a register user.pls signup to register yourself
  const existUser = await mongo.selecteddb
    .collection("users")
    .findOne({ email: req.body.email });
  if (!existUser) {
    return res
      .status(400)
      .send({
        msg: "you are not a register user pls signup to register yourself",
      });
  }

  const isSamePassword = await bcrypt.compare(
    req.body.password,
    existUser.password
  );
  if (!isSamePassword)
    return res.status(400).send({ msg: "incorrect password" });
  //  password: Incorrect password
  //generate token and send it as a response
  const token = jwt.sign(existUser, process.env.SECRET_KEY, {
    expiresIn: "1hr",
  });
  res.send(token);
};
