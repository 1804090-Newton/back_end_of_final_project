import { check, validationResult } from "express-validator";

export const authValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const loginChecks = [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }).exists(),
];

export const registerChecks = [
    check("username", "Name is required").exists(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }).exists(),
];