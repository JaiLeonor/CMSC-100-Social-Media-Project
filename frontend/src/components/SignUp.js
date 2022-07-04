import React from 'react';
import SignUpField from './SignUpField';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      errors: {}
    }

    this.handleFnameChange = this.handleFnameChange.bind(this)
    this.handleLnameChange = this.handleLnameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this)
    this.validate = this.validate.bind(this)
    this.invalidPassword = this.invalidPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFnameChange(e) {
    this.setState({ fname: e.target.value })
  }

  handleLnameChange(e) {
    this.setState({ lname: e.target.value })
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleRepeatPasswordChange(e) {
    this.setState({ repeatPassword: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()

    if(this.validate()) {
      const user = {
        fname: this.state.fname,
        lname: this.state.lname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
  
      // send a POSt request to localhost:3001/signup
      fetch(
        "http://localhost:3001/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(body => {
          if (body.success) { alert("Successfully saved user"); }
          else { alert("Failed to save user"); }
        });
      window.location.reload()
    }
  }

  validate() {
    let isValid = true
    let error = {}

    if(this.state.fname === "") {
      isValid = false
      error.fname = "First Name is required."
    }

    if(this.state.lname === "") {
      isValid = false
      error.lname = "Last Name is required."
    }

    if(this.state.username === "") {
      isValid = false
      error.username = "Username is required."
    }
    
    //Regex is from: https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
    if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      isValid = false
      error.email = "Please enter a valid email address"
    }

    if(this.state.email === "") {
      isValid = false
      error.email = "Email is required"
    }

    if(this.invalidPassword()) {
      isValid = false
      error.password = "Passwords should be at least 8 characters, have at least 1 number, 1 lowercase letter, and 1 uppercase letter."
    }

    if(this.state.password === "") {
      isValid = false
      error.password = "Password is required."
    }

    this.setState({ errors: error })

    return isValid
  }

  invalidPassword() {
    let upper = false
    let lower = false
    let hasNumber = false
    let invalid = true
    let i

    for(i = 0; i < this.state.password.length; i++) {
      if(parseInt(this.state.password[i])) {
        hasNumber = true
      }

      else {
        if(this.state.password[i] === this.state.password[i].toLowerCase()) {
          lower = true
        }
  
        if(this.state.password[i] === this.state.password[i].toUpperCase()) {
          upper = true
        }
      }
    }

    if(i >= 8 && hasNumber && lower && upper) { invalid = false }

    return invalid
  }

  render() {
    return (
      <div>
        <SignUpField
          type="text"
          placeholder="First Name"
          value={this.state.fname}
          changeHandler={this.handleFnameChange}
          error={this.state.errors.fname}
        />
        <SignUpField
          type="text"
          placeholder="Last Name"
          value={this.state.lname}
          changeHandler={this.handleLnameChange}
          error={this.state.errors.lname}
        />
        <SignUpField
          type="text"
          placeholder="Username"
          value={this.state.username}
          changeHandler={this.handleUsernameChange}
          error={this.state.errors.username}
        />
        <SignUpField
          type="email"
          placeholder="Email"
          value={this.state.email}
          changeHandler={this.handleEmailChange}
          error={this.state.errors.email}
        />
        <SignUpField
          type="password"
          placeholder="Password"
          value={this.state.password}
          changeHandler={this.handlePasswordChange}
          error={this.state.errors.password}
        />
        <br/>
        <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    )
  }
}