import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password:hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if(newUser){
        await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      gender: newUser.gender,
    });
    }else{
        return res.status(400).json({error:"Invalid User Data"})
    }
  } catch (error) {
    console.log("error in signUp controller", error.message);
    res.status(500).json({ error: "Inernal Server Error" });
  }
};

export const loginUser = (req, res) => {
  console.log("Login User");
};

export const logoutUser = (req, res) => {
  console.log("Logout User");
};
