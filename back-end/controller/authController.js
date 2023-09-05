import User from "../model/User.js";
import bcrypt from "bcrypt";

//register
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //becrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    //save new user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
};


//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //not email or password
    !(email || !password) && res.status(400).json("all fields are required")

    //check if their is user
    const user =await User.findOne({ email });
    !user && res.status(404).json("user not found");

    //verify password and response
    const validPassword = await bcrypt.compare(password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (error) {
    res.status(500).res(error)
  }
};
