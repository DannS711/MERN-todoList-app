const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "ValidationError":
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      res.status(400).json({ errors: validationErrors });
      break;

    case "Unauthenticated":
      res.status(401).json({ message: "Please login first!" });
      break;

    case "UniqueEmailReg":
      res.status(400).json({ message: "This email is already been taken!" });
      break;

    case "LoginEmptyInput":
      res.status(400).json({ message: "Please input email/password!" });
      break;

    case "UserNotFound":
      res.status(404).json({ message: "User not found!" });
      break;

    case "InvalidPassword":
      res.status(400).json({ message: "Invalid password!" });
      break;

    case "ListNotFound":
      res
        .status(404)
        .json({ message: "You don't have a list to work on yet!" });
      break;

    case "TaskNotFound":
      res
        .status(404)
        .json({ message: "You don't have a task to do on your list!" });
      break;

    default:
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = errorHandler;
