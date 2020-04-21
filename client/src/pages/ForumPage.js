import React from "react";
import axios from "axios";
import "./forum.css";
import Linkify from "react-linkify";

var tempuser = window.localStorage.getItem("user_data");
var userID;
var accessToken;
if (tempuser) {
  var userdata = JSON.parse(tempuser);
  userID = userdata.username;
  accessToken = userdata.access_token;
} else var userID = "";

class ForumPage extends React.Component {
  state = {
    //title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios
      .get("http://my-gym-pro.herokuapp.com/api/getallposts")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data.Posts });
        console.log("data received");
      })
      .catch(() => {
        alert("error retreiving data");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    const payload = {
      userID: userID,
      title: "dummy",
      description: this.state.body,
      date:"dummy"
    };

    axios({
      url: "http://my-gym-pro.herokuapp.com/api/createpost",
      method: "POST",
      data: payload,
      headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' + accessToken}
    })
      .then(() => {
        console.log("data sent to server");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("internal server error");
      });
  };

  resetUserInputs = () => {
    this.setState({
      // title: "",
      body: "",
    });
  };

  displayBlogPost = (posts) => {
    
    
     if (!Object.keys(posts).length) {
       console.log("error null posts arr");
       return null;
     }
      
    
    
  
//     return posts.map((post, index) => (
//       <div key={index} className="blog-post-display">
//         //<h3>{post.UserID}:</h3>
//         <Linkify>
//           <p>{post.Description}</p>
//         </Linkify>
//       </div>
//     ));
    
     const name = "" ;//Object.keys(posts.userID).map((index) => (
//       <div key={index}>
//         <h3>{posts.userID[index]}:</h3>
//       </div>
//    ));
   
   console.log("test");
    
   const post = Object.keys(posts.Description).map((index) => (
      <div key={index}>
        <Linkify>
          //console.log("display description");
          <p>{posts.Description[index]}</p>
        </Linkify>
      </div>
   ));
    
    return (
      <div className="blog-post-display">
      {name}
      {post}
      </div>
    )
  };

  doLogout = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  render() {
    //console.log("State: ", this.state);
    console.log("State/posts: ", this.state.posts);
    
    //jsx
    return (
      <div className="app">
        <h2 className="title">Welcome to the Forum.</h2>
        
        <div classname="blog-">{this.displayBlogPost(this.state.posts)}</div>
        <div className="user">
          <div className="signedinas">Signed in as: </div>
          <div className="profile">{userID}</div>
        </div>
        <form onSubmit={this.submit}>
          {/* <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div> */}
          <div className="form-input">
            <textarea
              name="body"
              placeholder="Say something interesting"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button className="submit">Post</button>
        </form>
        <button className="logout" onClick={this.doLogout}>
          Logout
        </button>
      </div>
    );
  }
}

export default ForumPage;
