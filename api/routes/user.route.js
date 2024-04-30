import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utilis/verifyUser.js';

// use express to create a Router instance
const router = express.Router()

// Request is the data we get from the client side
// Response is the data we send from the server side

router.get("/test", test);
// create Update API Route
// we need to check if the user is authenticated or not and if it is authenticated
// when a user is signin successfully we create a token inside the cookie and 
// NOW we can use the token to verify the user so we will know which user is updating his profile 
// we will create another function to verify the user that is updating his profile

router.post('/update/:id', verifyUser,  updateUser)

export default router