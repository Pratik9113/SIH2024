import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from '../models/userModels.js'; 

dotenv.config();

const jwtAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'User not authorized' });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET);

        const user = await userModel.findById(payload.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = {
            userId: user._id,
            email: user.email,
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export { jwtAuth };
