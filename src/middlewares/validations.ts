import { body } from 'express-validator';

const checkEmail = body('email')
  .isString()
  .normalizeEmail({
    all_lowercase: false,
  })
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .matches(/^\S+@\S+\.\S+$/)
  .withMessage('Invalid email format');

const checkName = body('name')
  .isString()
  .exists({ checkFalsy: false })
  .withMessage('name is required')
  .trim()
  .isLength({ min: 5, max: 50 })
  .withMessage('name: must be at least 5 chars long & maximum 50 chars');

const checkPassowrd = body('password')
  .exists({ checkFalsy: true })
  .withMessage('Password is required')
  .trim()
  .isLength({ min: 5, max: 1024 })
  .withMessage('Password: must be at least 5 chars longs');

export const validations = {
  checkEmail,
  checkName,
  checkPassowrd,
};
