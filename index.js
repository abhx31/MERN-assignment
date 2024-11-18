const express = require('express');
const { userRoute } = require('./route/userRoutes');
const { connectDB } = require('./db/connect');
const { adminRoute } = require('./route/adminRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api/v0/user', userRoute);
app.use('/api/v0/admin', adminRoute);

connectDB();
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`)
})