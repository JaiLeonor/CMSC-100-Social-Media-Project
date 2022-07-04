import React, { Component } from "react";
import AddPost from "../components/AddPost";
import EditPost from "../components/EditPost";
import Profile from "../pictures/friend.jpg";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: null,
      visiblePosts: [],
      postId: null,
      isEditing: false
    }
  }

  async componentDidMount() {
    await fetch("http://localhost:3001/find-username?username=" + localStorage.getItem("username"), { method: "GET" })
      .then(response => response.json())
      .then(body => this.setState({ visiblePosts: [localStorage.getItem("username"), ...body.friends] }))

    await fetch("http://localhost:3001/get-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ authors: this.state.visiblePosts })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          this.setState({ feed: body.feed });
        }
      });
  }

  render() {
    return(
      <main>
        {this.state.isEditing ? <EditPost postId={this.state.postId}/> : null}
        <AddPost/>
        {
          this.state.feed ? this.state.feed.map((post) => {
            return(
              <div className="post" key={post._id}>
                <div className="post-detail">
                  <img src={Profile} alt="profile"/>
                  {
                    post.author_username === localStorage.getItem("username") ?
                      <div className="dropdown">
                        <button className="dropbtn">...</button>
                        <div className="dropdown-content">
                          <button onClick={() => {
                            fetch("http://localhost:3001/delete-post?id=" + post._id, { method: "DELETE" })
                            window.location.reload()
                          }}>DELETE</button>
                          <button onClick={() => this.setState({ isEditing: true, postId: post._id })}>EDIT</button>
                        </div>
                      </div>
                    : null
                  }
                  <p>{post.author_name}</p>
                  {post.timeStamp}
                </div>
                <div className="post-text">
                  <p>{post.content}</p>
                </div>
              </div>
            )
          }) : null
        }
      </main>
    );
  }
}