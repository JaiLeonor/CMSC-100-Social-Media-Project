import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShortcutSidebar from "../components/ShortcutSidebar";
import SuggestionSidebar from "../components/SuggestionSidebar";
import Post from "../components/Post";

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: true }
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
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <Navbar/>
          <ShortcutSidebar/>
          <SuggestionSidebar/>
          <Post/>
        </div> 
      )
    }

    else return <Redirect to="/"/>
  }
}