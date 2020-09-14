const Joi = require('joi');

const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
