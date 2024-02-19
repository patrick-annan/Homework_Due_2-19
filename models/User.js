const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter a valid email'],
    unique: true,
    lowercase: true, 
    validate: [isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum length is 8 characters']
  }
})
// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if(user){
    const auth = await bcrypt.compare(password, user.password)
  if (auth){
    return user;
  }
  throw Error('Incorrect Password')
  }
  throw Error('Incorrect Email')
}

userSchema.post('save', function (doc, next){
  console.log('new user was created and saved', doc);
  next()
})
// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log('user about to be created and saved', this);
  next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;
