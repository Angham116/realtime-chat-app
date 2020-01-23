const { sign } = require('jsonwebtoken');
const boom = require('@hapi/boom');

const signupSchema = require('./utils/schema.validate');
const { createUser } = require('../../../db/queries');
const hashPassword = require('./utils/hashPassword');
const { SECRET } = require('../../../db/config');

module.exports = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const valid = await signupSchema
      .validate({
        username,
        email,
        password,
      }, { abortEarly: false });
    if (valid) {
      const hashedPassword = await hashPassword(password);
      const newUser = await createUser({ username, email, password: hashedPassword });
      if (newUser) {
        const cookie = sign({ username }, SECRET, { expiresIn: 6 * 30 * 24 * 60 * 60 * 1000 });
        res.cookie('jwt', cookie, { httpOnly: true });
        res.status(201).send();
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = error.inner.reduce((acc, item) => ({ ...acc, [item.path]: item.message }));
      const errObj = boom.badData('message', errors);
      next(errObj);
    } else if (error.code === 11000) {
      const err = error.errmsg.split('index: ')[1].split(' ')[0];
      const errField = err.substring(0, err.lastIndexOf('_'));
      const errObj = { [errField]: `${errField} is already exists` };
      const errors = boom.conflict('message', errObj);
      next(errors);
    } else {
      next(boom.badImplementation(error));
    }
  }
};
