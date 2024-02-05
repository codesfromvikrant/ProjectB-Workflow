const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({ email, password, username });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
}