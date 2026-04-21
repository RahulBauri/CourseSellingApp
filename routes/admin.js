const { Router } = require('express');
const zod = require('zod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { adminModel } = require('../db');
const { adminMiddleware } = require('../middlewares/admin');
const { courseModel } = require('../db');

const adminRouter = Router();

adminRouter.post('/signup', async function (req, res) {
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
    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.json({
      message: 'admin signup succeeded',
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

adminRouter.post('/signin', async function (req, res) {
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
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({ message: "admin with that email doesn't exists" });
    }

    isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD, {
      expiresIn: '30d',
    });

    res.json({ message: 'Signin successfull', token });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

adminRouter.post('/course', adminMiddleware, async function (req, res) {
  adminId = req.userId;

  const { title, description, price, imageUrl } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });

    res.status(200).json({ message: 'course created', courseId: course._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
});

adminRouter.put('/course', adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  try {
    const editedCourse = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        imageUrl,
      },
    );

    res.json({ message: 'course updated', courseId });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something went wrong' });
  }
});

adminRouter.get('/course/bulk', adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  try {
    const allCourses = await courseModel.find({ creatorId: adminId });
    res.json({
      allCourses,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something went wrong' });
  }
});

module.exports = { adminRouter };
