const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/UntitledDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Users

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
});

const User = mongoose.model("users", userSchema);

app.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// log in

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const thisUser = await User.findOne({ email });

    if (!thisUser) {
      return res.send("This email doesn't exist");
    }

    if (thisUser.password == password) {
      res.send("Log in Successfully");
    } else {
      res.send("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.send("Server error");
  }
});

//// Userbyemail

app.post("/userbyemail", async (req, res) => {
  const { email } = req.body;

  try {
    const users = await User.findOne({ email }).select(" email fullname -_id");

    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
});

/// Userbycourse

app.post("userbycourse", async (req, res) => {
  const { email } = req.body;

  try {
    const currentCourse = await course
      .findOne({ users: email })
      .select(" -_id");

    res.send(currentCourse);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
});

/////

// Courses

const CoursesSchema = new mongoose.Schema({
  grade: Number,
  name: String,
  cover: String,
  users: Array,
});

const course = mongoose.model("course", CoursesSchema, "Courses");

app.get("/courses", async (req, res) => {
  try {
    const courses = await course
      .find()
      .select("grade name cover users -_id")
      .sort({ grade: 1, name: 1 });
    console.log();
    res.send(courses);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Books

const booksSchema = new mongoose.Schema({
  tile: String,
  author: String,
  cover: String,
  grade: Number,
});

const books = mongoose.model("books", booksSchema);

app.get("/books", async (req, res) => {
  try {
    const { gradeNumber } = req.query;

    const bookDetails = await books.find({ grade: gradeNumber }).select("-_id");
    console.log();
    res.send(bookDetails);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Quizzes

const quizzesSchema = new mongoose.Schema({
  book: String,
  chapters: String,
  section: Number,
  id: Number,
});

const quizzes = mongoose.model("quizzes", quizzesSchema);

app.get("/quizzes", async (req, res) => {
  try {
    const { book } = req.query;

    const quizzesSection = await quizzes.find({ book }).select("-_id");

    res.send(quizzesSection);
  } catch (error) {
    console.error("Error retrieving quizzes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
