const express = require('express');

const app = express();

const port = 3000;

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
