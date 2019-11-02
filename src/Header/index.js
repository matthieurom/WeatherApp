import React from "react";
import "./index.scss";
import logo from "../Logo/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-appName">
          <img src={logo} alt="header-logo" />
          WeatherApp
        </div>
        <div className="header-title">{this.props.title}</div>
      </div>
    );
  }
}

export default Header;
