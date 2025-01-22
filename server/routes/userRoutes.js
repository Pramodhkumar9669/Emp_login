import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// All user routes
router.post('/signup', userController.creatingUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.changePassword);



router.post('/employeecreate', userController.createemployee);
router.get('/getusers', userController.getEmployee);
router.get('/:id', userController.getEmployeeId);
router.put('/update/:id', userController.updateEmployee);
router.delete('/:id', userController.deleteEmployee);

export default router;