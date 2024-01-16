import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password);

    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      blogs:[]
    });

    try {
      await user.save();
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User Not Found" });
    }

    if (password === existingUser.password) {
        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            'abcdefghijklmonooo', // Replace with a secure secret key
            { expiresIn: '1h' } // You can adjust the expiration time as needed
        );

        return res.status(200).json({ token, userId: existingUser._id });
    }

    return res.status(400).json({ message: "Incorrect password" });
};

// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email,password);
  
//     let existingUser;
//     try {
//       existingUser = await User.findOne({ email });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server Error" });
//     }
  
//     if (!existingUser) {
//       return res.status(400).json({ message: "User Not Found" });
//     }
  
    
//     if (password==existingUser.password) {
//       return res.status(200).json({ existingUser });
      
//     }
//     return res.status(400).json({ message: "Incorrect password" });
    
//   };
