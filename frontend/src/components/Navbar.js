import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
  }

  search(e) {
    if(e.key === 'Enter') {
      this.props.history.push("/find?name=" + document.getElementById("search-bar").value)
      window.location.reload()
    }
  }

  logout() {
    // Delete cookie with authToken
    const cookies = new Cookies();
    cookies.remove("authToken");

    // Delete username in local storage
    localStorage.removeItem("username");
  }

  render() {
    return(
      <div>
        <nav className="navbar">
        <div className="max-width">
          <div className="logo-search-bar">
            <div className="logo">
              <Link to="/feed"><header>friend<span>ZONE</span></header></Link>
            </div>
            <input type="text" id="search-bar" placeholder="Search Friendzone" onKeyPress={this.search}/>
          </div>
          <ul className="menu">
            <Link to="/feed"><li>Home</li></Link>
            <Link to={`/profile?username=${localStorage.getItem("username")}`}><li>Profile</li></Link>
            <Link to="/" onClick={this.logout}><li>Logout</li></Link>
          </ul>
        </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);