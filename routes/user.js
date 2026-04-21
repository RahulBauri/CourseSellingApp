const express = require('express');
const zod = require('zod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { userModel } = require('../db');
const { purchaseModel } = require('../db');
const { userMiddleware } = require('../middlewares/user');

const userRouter = express.Router();

userRouter.post('/signup', async function (req, res) {
  const signupSchema = zod.object({
    email: zod.email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const zodResponse = signupSchema.safeParse(req.body);

  if (!zodResponse.success) {
    return res.status(411).json({ msg: 'Invalid inputs' });
  }

  const { email, password, firstName, lastName } = zodResponse.data;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.json({
      message: 'user signup succeeded',
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

userRouter.post('/signin', async function (req, res) {
  const signinSchema = zod.object({
    email: zod.email(),
    password: zod.string(),
  });

  const zodResponse = signinSchema.safeParse(req.body);

  if (!zodResponse.success) {
    return res.status(411).json({ msg: 'Invalid inputs' });
  }

  const { email, password } = zodResponse.data;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "user with that email doesn't exists" });
    }

    isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_PASSWORD, {
      expiresIn: '30d',
    });

    res.json({ message: 'Signin successfull', token });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

userRouter.get('/purchases', userMiddleware, async function (req, res) {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({ userId });
    res.json({ purchases });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something went wrong' });
  }
});

module.exports = { userRouter };
