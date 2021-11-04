const express = require("express");
const app = express();
const port = 5000;
//커밋하기 전에 이거 지우기!! 비번!!!
const mongoose = require("moongoose");
mongoose
  .connect(
    "mongodb+srv://<dbID>:<password>@boilerplatetest.erzhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      //몽고디비 버전6이상은 이거없어도
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connccccccccccvvvvvvvected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
