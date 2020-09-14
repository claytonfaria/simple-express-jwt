const router = require('express').Router();
const auth = require('./verifyToken');

router.get('/', auth, (req, res) => {
  res.json({
    posts: {
      title: 'my fitst post',
      description: 'random data you shoulnd access',
    },
  });
});

module.exports = router;
