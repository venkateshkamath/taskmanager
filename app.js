const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");
require("dotenv").config();
const tasks = require("./routes/tasks");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
//middlewares

app.use(express.static("./public"));
app.use(express.json()); //imp for req.body

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware); // custom error from Express.js

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server is Running on port " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
