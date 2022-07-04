import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "../pictures/friend.jpg";
import Covid19 from "../pictures/informationcenter.png";
import Groups from "../pictures/groups.png";
import Events from "../pictures/events.png";
import Pages from "../pictures/pages.png";
import Explore from "../pictures/explore.png";

export default class ShortcutSidebar extends Component {
  render() {
    return(
      <div className="shortcut-sidebar">
          <div className="shortcut-main">
            <Link to={`/profile?username=${localStorage.getItem("username")}`}><div className="shortcut"><img src={Profile} alt="profile"/><p>{`${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`}</p></div></Link>
            <div className="shortcut"><img src={Covid19} alt="informationcenter"/><p>COVID-19 Information Center</p></div>
            <div className="shortcut"><img src={Groups} alt="groups"/><p>Groups</p></div>
            <div className="shortcut"><img src={Events} alt="events"/><p>Events</p></div> 
          </div>
          <div className="shortcut-section">
            <header>Your Shortcuts</header>
            <div className="shortcut"><img src={Pages} alt="page"/><p>Friendzone Page</p></div>
            <div className="shortcut"><img src={Pages} alt="page"/><p>Friendzone Page</p></div>
            <div className="shortcut"><img src={Pages} alt="page"/><p>Friendzone Page</p></div>
            <div className="shortcut"><img src={Explore} alt="page"/><p>Explore Feed</p></div>
          </div>
          <footer>Friendzone © 2021</footer>
      </div>
    );
  }
}