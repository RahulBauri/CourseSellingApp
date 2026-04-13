const express = require('express');

const app = express();

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');

app.use('/user', userRouter);
app.use('/course', courseRouter);

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
