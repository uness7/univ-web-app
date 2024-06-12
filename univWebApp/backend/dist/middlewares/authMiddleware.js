"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const protect = (0, _expressAsyncHandler.default)(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = _jsonwebtoken.default.verify(token, `${process.env.JWT_SECRET}`);
      req.user = await _User.default.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not Authorized to access this page');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No token');
  }
});
module.exports = {
  protect
};