"use strict";

var _homeController = require("../controllers/homeController");
const express = require('express');
const router = express.Router();
router.put('/items/return/:id', _homeController.returnOneItem);
router.get('/', _homeController.getHome);
router.post('/get-user-id', _homeController.getUserId);
router.get('/items/:id', _homeController.getOneItem);
router.get('/items', _homeController.getItems);
router.put('/account/:id', _homeController.updateOneUser);
router.post('/items/request/:id', _homeController.requestOneItem);
module.exports = router;