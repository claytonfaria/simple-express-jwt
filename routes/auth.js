const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

router.post('/register', registerValidation, async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('Email already exists');
  }

  const hashedPassword = await argon2.hash(req.body.password);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', loginValidation, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email or Password is invalid');
  }

  const validPass = await argon2.verify(user.password, req.body.password);
  if (!validPass) return res.status(400).send('Invalid Password');

  // Create as assign token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
