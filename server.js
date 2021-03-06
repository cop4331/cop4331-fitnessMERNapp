const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const path = require("path");
const BlogPost = require("./models/blogPost");

const app = express();
const PORT = process.env.PORT || 8080; //step 1

/*
const MONGODB_URI =
  "mongodb+srv://aus:Citizen100@mygympro-l1gbg.mongodb.net/test?retryWrites=true&w=majority";
//mongodb+srv://aus:Citizen100@mygympro-l1gbg.mongodb.net/test?retryWrites=true&w=majority
*/
//step 2
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://mainaccess:securepassword@cop4331-large-project-l2dqk.mongodb.net/MyGymPro?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
//saving data to mongoose database
const data = {
  title: "Welcome to the MyGymPro forum:",
  body: "discuss all ranging topics of fitness here with other users.",
};
const newBlogPost = new BlogPost(data); //instance of the model

newBlogPost.save((error) => {
  if (error) {
    console.log("newblogpost error");
  } else {
    console.log("data saved!");
  }
});
//.save
*/

//http request logger
app.use(morgan("tiny"));

//step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
