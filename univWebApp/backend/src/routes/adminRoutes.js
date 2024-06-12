import * as HomeCtrl from '../controllers/homeController';
import {getItems, getOneItem, getHome} from '../controllers/homeController';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(201).json({message: "Admin Dashboard"});
});


router.get('/items/:id', getOneItem);
router.get('/items', getItems);
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
