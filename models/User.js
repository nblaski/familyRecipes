const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "basic"
  },
  date: {
    type: Date,
    default: Date.now
  },
  profileImgURL: {
    type: String,
    default: "s3://thisoldrecipe-images/uploads/default.png"
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
