import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

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

const ThnxSchema = new mongoose.Schema({
  text1: {
    type: String,
    minLength: 3,
    maxLength: 250,
    required: true
  },
  text2: {
    type: String,
    maxLength: 250
  },
  text3: {
    type: String,
    maxLength: 250
  },
  ownerId: {
    type: String,
    required: true,
  }, 
  createdAt: {
    type: Date, 
    default: () => new Date()
  }
})

const Thnx = mongoose.model("Thnx", ThnxSchema);

// Create UserSchema to define input needed from the user and how it should be handled.
// Adjust according to Daniels instructions!
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // thnxIds: {
  //   type: Array,
  //  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  phoneNumber: {
   type: Number,
  }
});

const User = mongoose.model("User", UserSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Connection is working");
});

// Route for the user to register, bcrypt the password, and gives the user
// a accessToken
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false, 
        response: "Password must be minimum 8 characters"
      });
    } else {
      const newUser = await new User({
        username: username, 
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({
        success: true, 
        response: {
          username: newUser.username, 
          acessToken: newUser.accessToken, 
          id: newUser._id
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false, 
      response: error
    });
  }
});

// Route for the user to log in, checked the bcrypted password, and gives the user
// a accessToken
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});

// Authenticate the user by accessToken
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next()
    } else {
      res.status(401).json({
        response: "Please log in", 
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    });
  }
}; 

//returns all thnxs for a specific logged in user using accessToken to get user._id 
// and then search for ownerId
app.get("/thnxs", authenticateUser);
app.get("/thnxs", async (req, res) => {
  const accessToken = req.header("Authorization");
  const user = await User.findOne({accessToken: accessToken});
  const thnxs = await Thnx.find({ownerId: user._id});
  res.status(200).json({success:true, response: thnxs})
});

// return thnx from specific user and date
app.get("/thnxs/:date", authenticateUser);
app.get("/thnxs/:date", async (req, res) => {
  // getting the date from url 
  const date = req.params.date;
  console.log("date:", date);
  const queryDate = new Date(date);
  console.log("queryDate:", queryDate);
  const followingDate = new Date(queryDate.setDate(queryDate.getDate() +1));
  console.log("followingDate:", followingDate);
  // Validating the user by accesToken
  const accessToken = req.header("Authorization");
  const singleUser = await User.findOne({accessToken: accessToken});
  try {
    const thnxFromSpecificDate = await Thnx.find({
      ownerId: singleUser._id,
      createdAt: {
        $gte: (date),
        $lt: (followingDate)
      }
    });
    res.status(200).json({success:true, thnxFromSpecificDate})
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});


// for the inlogged user to post a thnx with 3 texts
// updates ownerId with the user._id
app.post("/thnxs", authenticateUser);
app.post("/thnxs", async (req, res) => {
  const accessToken = req.header("Authorization");
  const user = await User.findOne({accessToken: accessToken});
  const { text1, text2, text3 } = req.body;
  try {
    const newThnx = await new Thnx({text1: text1, text2: text2, text3: text3, ownerId: user._id}).save();
    res.status(201).json({success: true, response: newThnx});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
