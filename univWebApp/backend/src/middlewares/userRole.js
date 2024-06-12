const User = require('../models/user');

/*  
    Defined functions don't work in this case (unless we use asyncHandler package), but arrow functions do. 
    Issue: req.user was set by the protect middleware, but chekRole using defined function didn't recognize it.
    Question: difference between arrow and defined functions?
*/

const checkRole = async (req, res, next) => {
    try {
        const { user } = await User.findById(req.user.id);
        const user_role = user.role;
        if(user_role !== 'admin') {
            return res.json({message: "NOT AUTHORIZED TO ACCESS THIS PAGE"});
        }
        next();
    } catch (error) {
        res.json({message: error.message});
    }
}

module.exports = { checkRole };
