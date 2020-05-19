//подключаем мангуста и устанавливаем схему
const mongo = require("mongoose");
const Schema = mongo.Schema;
const privatePaths = require('mongoose-private-paths');
const bcrypt = require('bcryptjs');


//установка модели блога
const AdminModel = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Empty text'
    },
    age: {
        type: Number,
        required: true,
        default: null
    },
    password: {
        type: String,
        unique: true,
        required: true,
        private: true,
        default: 'Empty text'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        default: 'Empty text'
    },
    role:{
        type: String,
        unique: false,
        required: true,
        default: 'Empty text'
    }, 
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
});


AdminModel.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

//метод проверки имени name
AdminModel.methods.checkName = function(name, cb){
    return this.find({ name: new RegExp(name, "i") }, cb);
};


//метод проверки хешированного password
AdminModel.methods.comparePassword = function (hashPass, cb) {
  bcrypt.compare(hashPass, this.password, function (err, pass) {
    if (err) return cb(err);
    cb(null, pass);
  });
};

AdminModel.plugin(privatePaths);


//экспорт модели Admin
module.exports = mongo.model("Admin", AdminModel);