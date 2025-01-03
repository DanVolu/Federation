import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

interface RegisterInterface {
  username: string;
  email: string;
  weight_category: string;
  birthdate: string;
  password: string;
  repeat_password: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

const authController = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      username,
      email,
      weight_category,
      birthdate,
      password,
      repeat_password,
    }: RegisterInterface = req.body;

    try {
      if (password !== repeat_password) {
        res.status(400);
        throw new Error("Passwords do not match");
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        weight_category,
        birthdate,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password }: LoginInterface = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400);
        throw new Error("Incorrect password");
      }

      res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
