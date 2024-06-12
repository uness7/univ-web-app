"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Item = require('../models/Material');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const getUserId = asyncHandler(async (req, res) => {
  const userEmail = req.body.email;
  console.log(`Received email: ${userEmail}`);
  try {
    const user = await User.findOne({
      email: userEmail
    });
    console.log(`User found: ${user}`);
    if (user) {
      const userId = user._id;
      res.status(200).json({
        userId
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

//@access: Staff
const getHome = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Home Page"
  });
});

//@access: Staff, Admin
const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find().populate('requestedBy', 'name _id');
    ;
    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//@access: Staff, Admin
const getOneItem = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
      message: 'Id format is not valid'
    });
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({
      message: "item not found"
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// @access: Admin
const createOneItem = asyncHandler(async (req, res) => {
  const {
    type,
    description,
    status,
    room,
    createdAt
  } = req.body;
  try {
    const newItem = await Item.create({
      type: type,
      description: description,
      status: status,
      room: room,
      createdAt: createdAt || new Date()
    });
    res.status(201).json({
      newItem,
      message: `A new item has been created`
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// @access: Admin
const deleteOneItem = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
      message: 'Id format is not valid'
    });
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }
    await item.remove();
    res.json({
      message: 'Item deleted'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// @access: Admin
const updateOneItem = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
      message: 'Id format is not valid'
    });
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({
      message: 'Item not found'
    });
    if (req.body.name != null) item.name = req.body.name;
    if (req.body.description != null) item.description = req.body.description;
    if (req.body.price != null) item.price = req.body.price;
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

//@access: Admin
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({
      message: "No User Found"
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//@access: Admin
const getOneUser = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid) return res.status(404).json({
      message: "Id format is not valid"
    });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({
      message: "No User Found"
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//@access: Admin
const createOneUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    type,
    role
  } = req.body;
  const userExists = await User.findOne({
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
    const userCreated = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      type: type,
      role: role,
      created_at: req.body.created_at || new Date(),
      updated_at: req.body.updated_at || new Date()
    });
    res.status(201).json({
      user: {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        type: userCreated.type,
        role: userCreated.role,
        created_at: userCreated.created_at,
        updated_at: userCreated.updated_at
      },
      message: `A new user has been created`
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

//@access: Admin
const deleteOneUser = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
      message: 'Id format is not valid'
    });
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    await user.remove();
    res.json({
      message: `User with id: ${user.id} deleted`
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//@access: Admin, Staff
const updateOneUser = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
      message: 'Id format is not valid'
    });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
      message: 'user not found'
    });
    if (req.body.name != null) user.name = req.body.name;
    if (req.body.email != null) user.email = req.body.email;
    if (req.body.password != null) {
      const salt = await _bcrypt.default.genSalt(10);
      user.password = await _bcrypt.default.hash(req.body.password, salt);
    }
    if (req.body.type != null) user.type = req.body.type;
    const updateduser = await user.save();
    res.status(201).json(updateduser);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

//@access: Staff
//@Router: POST api/home/items/request/:id
const requestOneItem = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
    message: 'Id format is not valid'
  });
  const item = await Item.findById(req.params.id);
  if (item) {
    item.requestedBy = req.body.userId;
    item.requestStatus = 'pending';
    item.isRequested = true;
    await item.save();
    res.status(200).json({
      message: `Item requested successfully by ${req.body.userId}`
    });
  } else res.status(404).json({
    message: 'Item requested not found'
  });
});

//@access: Admin
//@HTTP Request : PUT /api/admin/items/approve/:id
const approve = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
    message: 'id format is not valid'
  });
  const status = req.body.status;
  console.log("status from server is : ", status);
  const item = await Item.findById(req.params.id);
  if (item) {
    item.requestStatus = status;
    if (status === 'approved') {
      item.status = 'used';
      item.isAccepted = true;
    }
    await item.save();
    res.status(200).json({
      message: `Item request ${status}`
    });
  } else {
    res.status(404).json({
      message: 'Item not found'
    });
  }
});

//@access: Staff
//@HTTP Request: PUT /api/home/items/return/:id
const returnOneItem = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({
    message: 'id format is not valid'
  });
  const item = await Item.findById(req.params.id);
  if (item) {
    item.status = 'stored';
    item.requestedBy = null;
    item.isRequested = false;
    item.isAccepted = false;
    await item.save();
    res.status(200).json({
      message: 'Item was returned'
    });
  } else {
    res.status(404).json({
      message: 'Server hanging'
    });
  }
});
module.exports = {
  getItems,
  getOneItem,
  createOneItem,
  deleteOneItem,
  updateOneItem,
  getOneUser,
  getAllUsers,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  getHome,
  requestOneItem,
  approve,
  getUserId,
  returnOneItem
};