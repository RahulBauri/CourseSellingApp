const { Router } = require('express');

const adminRouter = Router();

adminRouter.post('/signup', function (req, res) {
  res.json({
    message: 'signup endpoint',
  });
});

adminRouter.post('/signin', function (req, res) {
  res.json({
    message: 'signin endpoint',
  });
});

adminRouter.post('/course', function (req, res) {
  res.json({
    message: 'create course endpoint',
  });
});

adminRouter.put('/course', function (req, res) {
  res.json({
    message: 'edit course endpoint',
  });
});

adminRouter.get('/course/bulk', function (req, res) {
  res.json({
    message: 'get all courses endpoint',
  });
});

module.exports = { adminRouter };
