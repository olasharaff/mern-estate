import express from 'express'
import { test } from '../controllers/user.controller.js';

// use express to create a Router instance
const router = express.Router()

// Request is the data we get from the client side
// Response is the data we send from the server side

router.get("/test", test);

export default router