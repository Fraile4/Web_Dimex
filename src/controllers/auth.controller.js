import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, puesto } = req.body;

        // Check if the email is already in the database
        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json({message: ["The email is already in use"]});

        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: passwordHash,
            puesto
        });

        const savedUser = await user.save();
        const token = createAccessToken({id: savedUser._id});

        res.cookie('token', token);
        res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            puesto: savedUser.puesto
        }); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: ["User not found"]});

        // Compare the password
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({message: ["Invalid password"]});

        const token = createAccessToken({id:  userFound._id});

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            puesto: userFound.puesto
        }); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const logout =  (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        puesto: userFound.puesto
    });
}