require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
const taskListRouter = require("./routers/taskListRouter");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use(authentication)

app.use("/taskList", taskListRouter);

app.use(errorHandler);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () =>
      console.log(`Server port: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
