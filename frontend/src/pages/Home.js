import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import SignUp from "../components/SignUp";

export default class Home extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isSigningup: false
    }

    this.login = this.login.bind(this);
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


  login(e) {
    e.preventDefault();

    const credentials = {
      email: document.getElementById("l-email").value,
      password: document.getElementById("l-password").value
    }

    // Send a POST request
    fetch(
      "http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      .then(body => {
        if (!body.success) { alert("Failed to log in"); }
        else {
          // successful log in. store the token as a cookie

          const cookies = new Cookies();
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: "lax"
            });

            localStorage.setItem("username", body.username);
            localStorage.setItem("fname", body.fname);
            localStorage.setItem("lname", body.lname);
            this.setState({ isLoggedIn: true });
        }
      })
  }

  render() {
    if(!this.state.isLoggedIn) {
      return (
        <div>
          {this.state.isSigningup ? 
            <div className="bg-modal">
              <div className="login">
                <SignUp/>
              </div>
            </div>
          : null}
          <div className="login">
            <form>
              <input type="email" id="l-email" placeholder="Email" />
              <input type="password" id="l-password" placeholder="Password" />
              <button id="login" onClick={this.login}>Log In</button>
            </form>
            <hr/>
            <button className="signup" onClick={() => this.setState({ isSigningup: true })}>Create an Account</button>
          </div>
        </div>
      )
    }
    else { return <Redirect to="/feed"/>}
  }
}