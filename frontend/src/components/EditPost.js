import React, { Component } from "react";
import Profile from "../pictures/friend.jpg";

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.editPost = this.editPost.bind(this)
  }

  editPost(e) {
    if(e.key === 'Enter') {
      const post = {
        id: this.props.postId,
        content: document.getElementById("s-edit").value
      }
      fetch(
        "http://localhost:3001/edit-post",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(body => {
          if (!body.success) {
            alert("Failed to edit post")
            window.location.reload()
          }
          else window.location.reload()
        });
    }
  }

  render() {
    return(
      <div className="bg-modal">
        <div className="modal-content">
          <img src={Profile} alt="profile"/>
          <input type="text" id="s-edit" onKeyPress={this.editPost} placeholder="Edit your post"/>
        </div>
      </div>
    )
  }
}