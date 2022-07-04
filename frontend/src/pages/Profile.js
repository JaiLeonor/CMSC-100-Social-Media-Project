import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Friend from "../pictures/friend.jpg";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      isLoggedIn: true
    }
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

    fetch("http://localhost:3001/find-username" + window.location.search)
      .then(response => response.json())
      .then(body => this.setState({ name: `${body.fname} ${body.lname}`, email: body.email }))
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <Navbar/>
          <div className="profile">
            <img src={Friend} alt="profile"/>
            <p>Name: {this.state.name}</p><br/>
            <p>Email: {this.state.email}</p>
          </div>
        </div>
      )
    }

    else return <Redirect to="/"/>
  }
}