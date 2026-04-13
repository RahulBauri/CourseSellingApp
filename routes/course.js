const { Router } = require('express');

const courseRouter = Router();

courseRouter.get('/preview', function (req, res) {
  res.json({
    message: 'get all courses endpoint.',
  });
});

courseRouter.post('/purchase', function (req, res) {
  res.json({
    message: 'purchase a course endpoint.',
  });
});

module.exports = { courseRouter };
