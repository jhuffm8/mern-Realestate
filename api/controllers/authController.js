import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// sign up function
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // finding user by email
    const validUser = await User.findOne({ email });
    //checking if user email is valid
    if (!validUser) return next(errorHandler(404, "User not found!"));
    //using built in bycrypt functions to check in hash password is valid
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // if not valid sending an error message
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // creating a token with user id
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // destructuring the user and separating rest of info from the password
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//using google auth to create/sign in 
export const google = async (req, res, next) => {

  //looking for user
  try {
    const user = await User.findOne({ email: req.body.email });
    // if user found then sign in wth google auth 
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      //if not found then create user and password by creating a 16 case random and then hashing password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
      const {password: password, ...rest} = newUser._doc;
      res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
