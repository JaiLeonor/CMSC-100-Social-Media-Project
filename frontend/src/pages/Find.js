import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShortcutSidebar from "../components/ShortcutSidebar";
import SuggestionSidebar from "../components/SuggestionSidebar";
import Profile from "../pictures/friend.jpg";

export default class Find extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      isLoggedIn: true
    }

    this.addFriend = this.addFriend.bind(this)
  }

  addFriend(username) {
    const data = {
      from: localStorage.getItem("username"),
      to: username
    }
    fetch(
      "http://localhost:3001/add-friend",
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
          alert("Failed to add friend")
          window.location.reload()
        }
        else{
          alert("Friend request sent")
          window.location.reload()
        }
      });
  }

  componentDidMount() {
    // Send POST request to check if user is logged in
    fetch("http://localhost:3001/checkifloggedin",
      {
        method: "POST",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        if (body.isLoggedIn) {
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ isLoggedIn: false });
        }
      });

    fetch("http://localhost:3001/find-users" + window.location.search)
      .then(response => response.json())
      .then(body => this.setState({ users: body }))
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <Navbar/>
          <ShortcutSidebar/>
          <SuggestionSidebar/>
          <main>
            {
              this.state.users ? this.state.users.map((user) => {
                return(
                  <div className="find" key={user._id}>
                    {user.username !== localStorage.getItem("username") && !user.friends.includes(localStorage.getItem("username")) ? <button onClick={() => this.addFriend(user.username)}>Add Friend</button> : null}
                    <img src={Profile} alt="profile"/>
                    <Link to={`/profile?username=${user.username}`}><p>{`${user.fname} ${user.lname}`}</p></Link>
                    @{user.username}
                  </div>
                )
              })
              : null
            }
          </main>
        </div>
      )
    }
    
    else return <Redirect to="/"/>
  }
}