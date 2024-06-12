"use strict";

var _User = _interopRequireDefault(require("../models/User"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function signupUser(req, res) {
  const {
    name,
    email,
    password,
    type,
    role
  } = req.body;
  const userExists = await _User.default.findOne({
    email
  });
  if (userExists) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(password, salt);
  try {
    console.log(req.body);
    const userCreated = await _User.default.create({
      name: name,
      email: email,
      password: hashedPassword,
      type: type,
      role: role,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at
    });
    res.status(201).json({
      userCreated,
      message: `A new user has been created`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
}
function generateToken(id) {
  return _jsonwebtoken.default.sign({
    id
  }, `${process.env.JWT_SECRET}`, {
    expiresIn: '30d'
  });
}
async function loginUser(req, res) {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await _User.default.findOne({
      email
    });
    if (user && (await _bcrypt.default.compare(password, user.password))) {
      console.log("pass : ", password, "user pass:", user.password);
      res.status(201).json({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        message: `Welcome back`,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json("NO Account with these credentials. Please Register First");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message
    });
  }
}
module.exports = {
  signupUser,
  loginUser
};