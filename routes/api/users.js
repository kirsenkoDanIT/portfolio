const Router = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('User');
});

module.exports = router;
