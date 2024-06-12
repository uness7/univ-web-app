import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from 'express-async-handler'

const	protect = asyncHandler(async (req, res, next) => {
	let	token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
	{
		try {
			token = req.headers.authorization.split(' ')[1];
			console.log(token);
			const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not Authorized to access this page');
		}
	}

	if (!token)
	{
		res.status(401);
		throw new Error('Not Authorized, No token');
	}
});

module.exports = {
	protect,
};
