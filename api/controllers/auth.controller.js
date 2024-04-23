import User from "../models/user.model.js";
// import function to handle errors
import { errorHandler } from "../utilis/error.js";
// to encrypt the password we need to install bcrypt in the backend mern-estate directory and then encrypt the password
import bcryptjs from 'bcryptjs'
// to hash the user data, create a token for user details and then send it to the client, we need to install jsonwebtoken in the backend mern-estate directory
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) =>{
//   destructuring the request body
    const {username, email, password} = req.body;
    // bcrypt the password by hashing it
    const hashPassword = bcryptjs.hashSync(password, 10);
    // then save it in the database by using model in user.model.js
    const newUser = new User({ username, email, password: hashPassword });
    try {
      // save the new user in the database
      await newUser.save();
      // send a response to the client
      res.status(201).json("Account created successfully!");
    } catch (error) {
        // create a middleware to handle the error
        next(error);
        // create a function to handle the error
        //  next(errorHandler(550, "Error from the function"));
    }
   
};

// create controller authentication for signin route
export const signin = async (req, res, next) => {
  const {email, password} = req.body 
  try {
    // check if email exists in the database
    const ValidUser = await User.findOne({email})
    // check if the email is not correct or invalid
    if (!ValidUser) return next(errorHandler(550, "invalid email"));
    // check if password exists in the database
    const validPassword = bcryptjs.compareSync(password, ValidUser.password)
    // check if the password is correct or invalid
    if (!validPassword) return next(errorHandler(401, "Invalid password"))
    // if both email and password are correct, we need to authenticate and we can only do that by adding cookies inside the browser
    // we need to create the hash token that includes the email or Id of the user and saved the token in the browser cookies
    const token = jwt.sign({id: validPassword.id}, process.env.JWT_SECRET_KEY)
    // delete the password from the browser cookies by the destructuring the Valid user doc
    const {password: pass , ...rest} = ValidUser._doc
    // save the token as the cookie
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
  } catch (error) {
    next(error);
  }

}
export const google = async (req, res, next) => {
  try {
    // check if email exists
    const user = await User.findOne({ email: req.body.email });
    // if email exists we can register the user, otherwise create a new user
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access-token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      let username;
      if (req.body.name) {
        username =
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4);
      } else {
        // If name doesn't exist, generate a random username
        username = Math.random().toString(36).slice(-12);
      }

      // Generate a random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the password
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user
      const newUser = new User({
        username: username,
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
