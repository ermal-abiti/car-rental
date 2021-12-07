const mongoose = require('mongoose');
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const jwt_decode = require('jwt-decode');
const { MongoClient } = require('mongodb');


const app = express();

app.use(express.json());


const User = require("./model/user");


app.get("/rental-cars", async (req, res) => {
    //query parameters
    const params = req.query;

    // object that consists of query parameters ex. /rental-cars?color=
    const query = { 
      year: params.year ? parseInt(params.year) : undefined, 
      color: params.color,
      steering_type: params.steering_type, 
      number_of_seats: params.number_of_seats ? parseInt(params.number_of_seats) : undefined
    }

    //deleting undefined values of query parameters
    Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
    console.log(query);
    await MongoClient.connect('mongodb://localhost:27017', function(err, db) {
      if (err) throw err;
      let dbo = db.db("carRental");
      dbo.collection("cars").find(query).sort({price_per_day: 1}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result)
        db.close();
      });
    });
  
  
})

app.post("/my_profile", auth, async (req, res) => {
    var token = req.headers['x-access-token'];
    var decoded = jwt_decode(token);
    var user = await User.findOne({ username: decoded.username });
    
    res.json({
        fullName: user.fullName,
        username: user.username,
        email: user.email
    });
  });

// POST /register
app.post("/register", async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { fullName, username, email, password } = req.body;

        // Validate user input
        if (!(email && password && fullName && username)) {
        res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
        );
        // save user token
        user.token = token;
        

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// POST /login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;

          
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});


module.exports = app;