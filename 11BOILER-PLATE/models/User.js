const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    //빈칸,스페이스 없애주는역할
    trim: true,
    //똑같은 이메일 쓰지 못하게
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  //어떤 유저가 0이면관리자가 될수도 1이면일반 유저가 될수도있게 만들 수 있음
  role: {
    type: Number,
    //임의로 롤지정하지 않으면 0주겠다.
    default: 0,
  },
  image: {
    image: String,
    //토큰 통해서 나중에 유효성관리할수있음
    token: {
      type: String,
    },
    //토큰이 사용할 수 있는 유효기간
    tokenExp: {
      type: Number,
    },
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  //비밀번호를 바꿀 때만 암호화한다고 조건 달아줌
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
  //만약 비밀번호 바꾸는게 아니라 다른거바꿀때는
  else {
    next();
  }
});

//메서드만들어~
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 12345 암호화된 비밀번호 $2b$10$.Wy0eWEB9tCAZy3BT9drU.ZTKvtT9iNe0Hryfp1q3ANtAtY1BjD7m
  //둘이 같은지 확인해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log("user._id", user._id);
  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id+'secretToken' = token
  // ->
  // 'secretToken'->user._id
  user.token = token;
  //유저에 넣어줌
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // user._id + '' = token
  //토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//스키마를 모델로 감싸줘~
const User = mongoose.model("User", userSchema);

//이 모델을 다른 파일에서도 쓰고싶으니까 내보내기 해주기
module.exports = { User };
