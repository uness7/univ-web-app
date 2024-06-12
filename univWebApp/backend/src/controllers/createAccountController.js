import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function signupUser(req, res) {
    const { name, email, password, type, role } = req.body;
    const userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).json({message: 'User already exists'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        console.log(req.body)
        const userCreated = await User.create(
            {
                name: name,
                email: email,
                password: hashedPassword,
		type: type,
                role: role,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at
            }
        );
        res.status(201).json({
            userCreated,
            message: `A new user has been created`
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}


function generateToken(id) {  
    return jwt.sign({id}, `${process.env.JWT_SECRET}`, {
        expiresIn: '30d'
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password) ) ) {
		console.log("pass : ", password, "user pass:", user.password);
		res.status(201).json(
			{
				_id: user._id,
				role: user.role,
				name: user.name,
				email: user.email,
				message: `Welcome back`,
				token: generateToken(user._id)
			}
            );
        }else{
		res.status(401).json("NO Account with these credentials. Please Register First");
        }
    } catch (error) {
        console.log(error);
         res.status(400).json({ message: error.message });
    }
}



module.exports = {
    signupUser,
    loginUser
};
