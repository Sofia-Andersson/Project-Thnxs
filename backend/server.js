import express from "express";
import cors from "cors";
import mongoose from "mongoose"

// Necessary to use mongoose:
// npm install
// npm install mongoose
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-gratitude-journal-final";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const GratitudeThoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: {
    type: String,
    required: true,
  }
})
// Create UserSchema to define input needed from the user and how it should be handled.
// Adjust according to Daniels instructions!
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gratitudeThoughtsIds: {
    type: Array,
   },
  ownerId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
