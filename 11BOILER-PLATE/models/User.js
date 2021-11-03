const mongoose = require("moongoose");
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

//스키마를 모델로 감싸줘~
const User = mongoose.model("User", userSchema);

//이 모델을 다른 파일에서도 쓰고싶으니까 내보내기 해주기
module.exports = { User };
