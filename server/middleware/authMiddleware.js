import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);      
      req.user = await userModel.findById(decoded.userId).select('-password');      
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
});

export { protect };
