import { Router } from "express";
import { body } from "express-validator";
import { signUp, signIn, authUser } from '../controllers';
import isAuthenticated from "../middlewares/isAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post('/signup', body('email')
  .isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 4, max: 24 })
    .withMessage('Password must be between 4 and 24 characters'),
  validateRequest,
  signUp
);

router.post('/signin', signIn);

router.get('/auth-user', isAuthenticated, authUser);

export default router;