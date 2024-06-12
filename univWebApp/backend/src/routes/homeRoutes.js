const express = require('express');
const router = express.Router();
import {getItems, getOneItem, getHome, updateOneUser, requestOneItem, getUserId, returnOneItem}  from '../controllers/homeController';


router.put('/items/return/:id', returnOneItem);

router.get('/', getHome);
router.post('/get-user-id', getUserId);
router.get('/items/:id', getOneItem);
router.get('/items', getItems);

router.put('/account/:id', updateOneUser);
router.post('/items/request/:id', requestOneItem);

module.exports = router;
