import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import User from '../models/User.js';

// 🔒 Protect Company Routes
export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id).select('-password');

    if (!company) {
      return res.status(401).json({ success: false, message: 'Company not found' });
    }

    req.company = company;
    req.auth = { companyId: company._id }; // ✅ for consistency across controllers
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token: ' + error.message });
  }
};

// 🔒 Protect User Routes
export const protectUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    req.auth = { userId: user._id }; // ✅ standardized access in controllers
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token: ' + error.message });
  }
};