"use strict";

var _homeController = _interopRequireWildcard(require("../controllers/homeController"));
var HomeCtrl = _homeController;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.status(201).json({
    message: "Admin Dashboard"
  });
});
router.get('/items/:id', _homeController.getOneItem);
router.get('/items', _homeController.getItems);
router.put('/items/approve/:id', HomeCtrl.approve);
router.post('/createOneItem', HomeCtrl.createOneItem);
router.delete('/deleteOneItem/:id', HomeCtrl.deleteOneItem);
router.put('/updateOneItem/:id', HomeCtrl.updateOneItem);
router.get('/getAllUsers', HomeCtrl.getAllUsers);
router.get('/getOneUser/:id', HomeCtrl.getOneUser);
router.post('/createOneUser', HomeCtrl.createOneUser);
router.delete('/deleteOneUser/:id', HomeCtrl.deleteOneUser);
router.put('/updateOneUser/:id', HomeCtrl.updateOneUser);
module.exports = router;