const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    const payload = verifyToken(access_token);

    let user = {};
    user = await User.findOne({ _id: payload.id });

    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.userData = {
      UserId: user._id,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
