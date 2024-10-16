const express = require("express");
require("./db/conn");

const Todo = require("./models/todo");
const app = express();
const port = process.env.PORT || 8005;
app.use(express.json());

app.get("/", (req, res) => {
  res.end("welcome to you todo list");
});

// app.post("/todo", async (req, res) => {
//   try {

//     if (todoData.length === 0) {
//       return res.status(404).send({ error: "todo not found" });
//     }
//       const user = new Todo(req.body);
//     const createTodo = await user.save();
//     res.status(201).send(createTodo);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

app.post("/todo", async (req, res) => {
  try {
    let { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).send({ error: "Title is required." });
    }

    title = title.trim();
    title = title.split(" ").join(",");
    console.log(title);

    const user = new Todo({ title, description });

    const createTodo = await user.save();

    res.status(201).send(createTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/todo/description", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || description.trim() === "") {
      return res.status(400).send({ error: "description is required." });
    }
    const user = new Todo(req.body);
    const createTodo = await user.save();

    res.status(201).send(createTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

//......reading the data by get method.....!!!!!

app.get("/todo/all", async (req, res) => {
  try {
    const TodoData = await Todo.find({});
    res.send(TodoData);
  } catch (err) {
    res.send(err);
  }
});

//.......reading data by get (find()) method......!!!!!

app.get("/todo/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const TodoData = await Todo.findById(_id);

    //.. throughing an error id data is not found...!!!

    if (TodoData.length === 0) {
      return res.status(404).send({ error: "todo not found" });
    } else {
      res.send(TodoData);
    }
  } catch (err) {
    res.send(err);
  }
});

//.....update using patch.....!!!!

app.patch("/todo/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateTodo = await Todo.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateTodo);
    0;
  } catch (e) {
    res.status(404).send(updateTodo);
  }
});

//.... how to delete the document from collection by using delete method.....!!!!

app.delete("/todo/:id", async (req, res) => {
  try {
    if (req.params.id === " ") {
      return res.status(404).send();
    }

    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

    res.send(deleteTodo);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`connection is running on ${port}`);
});
