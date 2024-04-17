import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
// import function to handle errors
// import { errorHandler } from "../utilis/error.js";
// to encrypt the password we need to install bcrypt in the backend mern-estate directory and then encrypt the password

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
   
}