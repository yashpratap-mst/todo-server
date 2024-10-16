const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/todo-list")
  .then(() => {
    console.log("connection is succesful");
  })
  .catch((err) => {
    console.log("connection fail");
  });
