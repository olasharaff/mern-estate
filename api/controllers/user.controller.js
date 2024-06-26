import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import {errorHandler} from "../utilis/error.js"

export const test = (req, res) => {
  res.json({
    message: "Api routes is working!!!!",
  });
};

export const updateUser = async  (req, res, next) => {
  // check if the request.user from the verify user is not equal to the params in '/update/:id', then throw an error , if true update the user
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'))
  // if user is trying to change password, we need to hash the password
  try {
    if(req.body.password){
      req.body.password =  bcryptjs.hashSync(req.body.password, 10)
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set:{
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, {new: true});
    const {password, ...rest} = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async  (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie("access_token")
    res.status(200).json('User has been deleted!')
  } catch (error) {
    next(error)
  }

}