const express = require("express");
require("./db/mongoose");
const Task = require("./db/models/task");
const userRouter = require("./Routes/user");
const taskRouter = require("./Routes/task");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Runing");
});
