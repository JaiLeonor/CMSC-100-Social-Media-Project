import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ad from "../pictures/ad1.jpg";
import Friend from "../pictures/friend.jpg";

export default class SuggestionSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { friendRequests: [] }

    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  }

  accept(user) {
    const data = {
      from: localStorage.getItem("username"),
      to: user
    }
  
    fetch(
      "http://localhost:3001/accept-friend",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(body => {
        if (!body.success) {
          alert("Failed to accept friend request")
          window.location.reload()
        }
        else window.location.reload()
      });
  }

  reject(user) {
    console.log(user)
    const data = {
      from: localStorage.getItem("username"),
      to: user
    }

    fetch(
      "http://localhost:3001/reject-friend",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(body => {
        if (!body.success) {
          alert("Failed to reject friend request")
          window.location.reload()
        }
        else window.location.reload()
      });
  }

  componentDidMount() {
    fetch("http://localhost:3001/find-username?username=" + localStorage.getItem("username"))
      .then(response => response.json())
      .then(body => this.setState({ friendRequests: body.pending }))
  }

  render() {
    return(
      <div className="suggestions-sidebar">
        <div className="ad-section">
          <div className="ad">
            <header>Suggested for You</header><br/>
            <a href="https://pc-sao.heatgames.me/?sp=1015&ss=12015541&ts=c26faf9e8bc0" target="_blank" rel="noreferrer"><img src={Ad} alt="friend"/></a>
            <p>Play in the vast world of Sword Art Online today.</p>
          </div>
        </div>
        {
          this.state.friendRequests ? this.state.friendRequests.map((user) => {
            return(
              <div className="friend-request">
                <img src={Friend} alt="friend"/>
                <p><Link to={`/profile?username=${user}`}><b>@{user}</b></Link> sent you a friend request</p>
                <button className="accept" onClick={() => this.accept(user)}>Accept</button>
                <button className="reject" onClick={() => this.reject(user)}>Reject</button>
              </div>
            )
          })
          : null
        }

      </div>
    );
  }
}