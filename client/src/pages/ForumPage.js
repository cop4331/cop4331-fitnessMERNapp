import React from "react";
import axios from "axios";
import "./forum.css";
import Linkify from "react-linkify";

var userdata = JSON.parse(window.localStorage.getItem("user_data"));
var username = userdata.firstName;

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
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
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
      user: username,
      // title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
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
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post-display">
        <h3>{post.user}:</h3>
        <Linkify>
          <p>{post.body}</p>
        </Linkify>
      </div>
    ));
  };

  doLogout = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  render() {
    console.log("State: ", this.state);

    //jsx
    return (
      <div className="app">
        <h2 className="title">Welcome to the Forum.</h2>
        <div classname="blog-">{this.displayBlogPost(this.state.posts)}</div>
        <div className="user">
          <div className="signedinas">Signed in as: </div>
          <div className="profile">{username}</div>
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
