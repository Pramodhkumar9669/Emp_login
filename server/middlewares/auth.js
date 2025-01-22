
import jwt from 'jsonwebtoken';
const excludeRoutes = ['/userData/login', '/userData/signup', '/userData/employeecreate', '/userData/getusers', '/userData/update/:id','/userData/:id'];

export default async function authorizationUser(req, res, next) {
    const token = req.headers.authorization;
    
    if (excludeRoutes?.includes(req.path)) {
 return next();
    }
    if (!token) {
    return res.status(401).json({ message: 'No token provided' });
    }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
  return next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}