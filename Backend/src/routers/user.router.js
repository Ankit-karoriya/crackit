import express from 'express';
import { login, logout, register } from '../controllers/user.controller.js';
import verifyJWT from '../utils/jwtVerify.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

router.get('/check-auth', verifyJWT, (req, res) => {
    res.status(200).json({ loggedIn: true, user: {email: req.user.user.email, fullname: req.user.user.fullname}});
})

export default router;