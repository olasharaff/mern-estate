
import jwt from "jsonwebtoken"

export const verifyUser = (req, res, next) => {
// we need to get data from the cookie and in order to get any data from the cookie we need to install another package
// install the package in the backend
// the package npm i cookie-parser
// we will import cookieParser and use it in the backend index.js
// ---------------------------------------------------------------->
// get the access token from the cookie and verify it
const token = req.cookies.access_token
if(!token) return next(errorHandler(401, 'Unauthorized'))
jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
  if (err) return next(errorHandler(403, "Invalid"));
  // if the user is verified, exist then send the user id (req.user) to the user to be able to access the update the profile
  req.user = user;
  next();
});


}