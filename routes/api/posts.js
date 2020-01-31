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
      const user = await User.findById(req.user.id).select('-password');

      const post = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar
      });

      await post.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).json('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).json('Server error');
  }
});

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const like = post.likes.filter(
      like => like.user.toString() === req.user.id
    );
    const unlike = post.unlikes.filter(
      like => like.user.toString() === req.user.id
    );

    if (!like.length && !unlike.length)
      post.likes = [{ user: req.user.id }, ...post.likes];

    if (unlike.length)
      post.unlikes = post.likes.filter(
        unlike => unlike.user.toString() !== req.user.id
      );

    if (like.length) return res.status(400).json({ msg: 'Post already liked' });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).json('Server error');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const like = post.likes.filter(
      like => like.user.toString() === req.user.id
    );
    const unlike = post.unlikes.filter(
      like => like.user.toString() === req.user.id
    );

    if (!like.length && !unlike.length)
      post.unlikes = [{ user: req.user.id }, ...post.unlikes];

    if (like.length)
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user.id
      );

    if (unlike.length)
      return res.status(400).json({ msg: 'Post already unliked' });

    await post.save();

    res.json(post.unlikes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).json('Server error');
  }
});

router.post(
  '/comment/:id',
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
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const comment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar
      };

      post.comments = [comment, ...post.comments];

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) return res.status(404).json({ msg: 'Comment not found' });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorised' });

    post.comments = post.comments.filter(
      comment => comment.id !== req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.status(500).json('Server error');
  }
});

module.exports = router;
