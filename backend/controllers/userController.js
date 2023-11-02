const { signToken } = require("../helpers/jwt");
const { passwordChecker } = require("../helpers/bcryptJs");
const User = require("../models/Users");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user) throw { name: "UniqueEmailReg" }

      const createUser = new User({
        username,
        email,
        password,
      });
      await createUser.save();
      

      res.status(200).json({ message: "Account has been created" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LoginEmptyInput" };
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw { name: "UserNotFound" }
      }

      const isValid = await passwordChecker(password, user.password);

      if (isValid) {
        const access_token = signToken({
          id: user._id,
          email: user.email,
        });

        res.status(200).json({
          id: user._id,
          email: user.email,
          access_token: access_token,
        });
      } else {
        throw { name: "InvalidPassword" }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
