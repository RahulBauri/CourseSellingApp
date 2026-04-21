const { Router } = require('express');
const { userMiddleware } = require('../middlewares/user');
const { purchaseModel } = require('../db');
const { courseModel } = require('../db');

const courseRouter = Router();

courseRouter.get('/preview', async function (req, res) {
  try {
    const allCourses = await courseModel.find({});
    res.json({ allCourses });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something went wrong' });
  }
});

courseRouter.post('/purchase', userMiddleware, async function (req, res) {
  const userId = req.userId;
  const { courseId } = req.body;

  try {
    await purchaseModel.create({ courseId, userId });
    res.json({ message: 'course purchased' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something went wrong' });
  }
});

module.exports = { courseRouter };
