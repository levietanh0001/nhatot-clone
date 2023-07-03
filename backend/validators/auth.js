const { body } = require("express-validator");

const emailValidation = body('email')
        .notEmpty()
        .withMessage('Email address must not be empty')
        .isEmail()
        .withMessage('Please specify a valid email address')
        .custom((value, {req, res}) => {
            if(!value.includes('@')) {
                throw new Error('Not an email');
            }
            return true;
        })
        .normalizeEmail();


function validate_login(req, res, next) {
    return [
        // check('email').isEmail() // // this check for all instances of 'email'
        emailValidation    
    ];

}

function validate_register(req, res, next) {
    return [
        emailValidation,
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password should have at least 6 characters'),
        body('confirm-password')
            .custom((value, {req, res}) => {
                if(value !== req.body['password']) {
                    throw new Error('Both passwords must match');
                }
                return true;
            }),
    ];
}


module.exports = {
    validate_login,
    validate_register
};