const mongoose = require('mongoose')
const express = require("express");
const todoList = require('./Controller/TodoList');
const cors = require('cors')

require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dmbpu.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ToDoList App"
  })
})

require("./Routes/TodoList")(app);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});