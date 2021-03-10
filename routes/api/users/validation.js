const Joi = require("joi");
const { Subscription } = require("../../../helpers/constants");

const schemaRegUser = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required().min(3).max(15),
  subscription: Joi.string().valid(
    Subscription.FREE,
    Subscription.PRO,
    Subscription.PREMIUM
  ),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required().min(3).max(15),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.regUser = (req, res, next) => {
  return validate(schemaRegUser, req.body, next);
};

module.exports.loginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
