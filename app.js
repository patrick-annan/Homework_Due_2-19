const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./Middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://patrickannan:test123@cluster0.8vfwu0i.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// create a cookie  

// app.get('/set-cookie', (req, res) => {
//   // res.setHeader('Set-cookie', 'newUser=true')
//   res.cookie('newUser', false)
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
//   res.send('you got the cookie, check the application tab in the inspect tool')
// })

// // read cookies
// app.get('/read-cookies', (req,res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
  
//   res.json(cookies);
// })