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
      
      
//      const entries = Object.entries(JSON.parse(posts));
//      //const keys = Object.keys(posts);

//      console.log(entries);
//      const content ="";
//     for (const  [ID, id, User, user, Title, title, Entry, entry, Date, date] of entries) {
//       content.push(
//       <div>
//          <h3>{user}:</h3>
//          <Linkify>
//            <p>{entry}</p>
//          </Linkify>
//       </div>
//       );
//     }
    
    
//     return (
//       <div className="blog-post-display">
//       {content}
//       </div>
//     );
    const data = JSON.parse(posts);
    console.log("parsed posts:", data); 
    
    return data.map((post, index) => (
      <div key={index} className="blog-post-display">
        <h3>{post.UserID}:</h3>
        <Linkify>
          <p>{post.Description}</p>
        </Linkify>
      </div>
    ));
      //console.log(Object.Keys(posts).length);
    
//     {Object.keys(posts).map(function(key) {
//       return (
//       <div className="blog-post-display">
//         <h3>{posts.UserID[key]}:</h3>
//        <Linkify>
//           <p>{posts.Description[key]}</p>
//         </Linkify>
//       </div>
//       );})}

    

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
