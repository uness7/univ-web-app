"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = require("body-parser");
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _signupRoutes = _interopRequireDefault(require("./routes/signupRoutes"));
var _db = require("./config/db");
var _authMiddleware = require("./middlewares/authMiddleware");
var _homeRoutes = _interopRequireDefault(require("./routes/homeRoutes"));
var _adminRoutes = _interopRequireDefault(require("./routes/adminRoutes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();
//import userRole from './middlewares/userRole'

(0, _db.connectDB)();
const app = exports.app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use('/api', _signupRoutes.default);
app.use('/api/home', _authMiddleware.protect, _homeRoutes.default);
app.use('/api/admin', _authMiddleware.protect, _adminRoutes.default);
const start = () => {
  app.listen(3000, () => {
    console.log('server is running on 3000');
  });
};
exports.start = start;