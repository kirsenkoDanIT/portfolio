const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator/check');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter a password, min 5 characters').isLength({ min: 5 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send('User');
  }
);

module.exports = router;
