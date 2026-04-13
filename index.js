const express = require('express');

const app = express();

app.post('/user/signup', function (req, res) {
  res.json({
    message: 'signup endpoint',
  });
});
app.post('/user/signin', function (req, res) {
  res.json({
    message: 'signin endpoint',
  });
});
app.get('/user/purchases', function (req, res) {
  res.json({
    message: 'user purchased courses endpoint',
  });
});
app.post('/course/purchase', function (req, res) {
  res.json({
    message: 'purchase a course endpoint',
  });
});
app.get('/courses', function (req, res) {
  res.json({
    message: 'get all courses endpoint',
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
