const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function passwordChecker(password, userPass) {
  return bcrypt.compareSync(password, userPass);
}

module.exports = { hashPassword, passwordChecker };
