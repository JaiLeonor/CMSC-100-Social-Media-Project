import React, { Component } from "react";
import Profile from "../pictures/friend.jpg";

export default class AddPost extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
  }

  addPost() {
    const post = {
      author_username: localStorage.getItem("username"),
      author_name: `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`,
      content: document.getElementById("s-post").value
    }

    fetch(
      "http://localhost:3001/add-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      })
      .then(response => response.json())
      .then(body => {
        if (!body.success)  alert("Failed to add post"); 
      });
  }

  render() {
    return(
      <div className="add-post">
        <form onSubmit={this.addPost}>
          <img src={Profile} alt="profile"/>
          <input type="text" id="s-post" placeholder={`What's on your mind, ${localStorage.getItem("fname")}?`}/>
        </form>
      </div>
    );
  }
}