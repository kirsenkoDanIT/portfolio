const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');

const auth = require('../../middleware/auth');

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar
      });

      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

module.exports = router;
