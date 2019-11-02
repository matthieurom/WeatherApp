import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/index";
import "./index.scss";
import { updatePageIndex } from "../actions/cityActions";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake
} from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  state = {
    inputCity: "",
    pageSelected: 1,
    nbPage: 1
  };

  componentWillMount() {
    const pages = Math.ceil(this.props.cities.length / this.props.pageSize);
    this.setState(
      {
        nbPage: pages
      },
      () => console.log("nb page is : ", this.state.nbPage)
    );
  }

  handleChangeInput = e => {
    this.setState({
      inputCity: e.target.value
    });
  };

  handleGoBack = () => {
    if (this.state.pageSelected > 1) {
      this.setState({
        pageSelected: this.state.pageSelected - 1
      });
    }
  };

  handleChangePage = nb => {
    let currentPage = this.state.pageSelected + nb;
    this.props.updatePageIndex(currentPage);
    console.log(this.props);
  };

  handleGoForward = () => {
    if (this.state.pageSelected + 2 < this.state.nbPage) {
      this.setState({
        pageSelected: this.state.pageSelected + 1
      });
    }
  };

  // Used to determine which icon from FontAwesome is needed
  weatherIcon = weather => {
    if (weather === "Clear") return faSun;
    if (weather === "Clouds") return faCloud;
    if (weather === "Rain" || weather === "Drizzle") return faCloudRain;
    if (weather === "Snow") return faSnowflake;
  };

  displayWidget = city => {
    return (
      <li key={city.name} className="city">
        <div className="city-weatherIcon">
          <img
            src={`http://openweathermap.org/img/w/${city.icon}.png`}
            alt="weather-logo"
            className="weatherIcon"
          />
          {/* <FontAwesomeIcon icon={this.weatherIcon(city.weather)} /> */}
        </div>
        <div className="city-name">
          <div className="city-title">
            {city.name}, {city.country}
          </div>
          <div className="city-infos">
            <div className="city-infos-1">
              <span>Humidity : {city.infos.humidity} %</span>
              <span>T°(C) max : {city.infos.temp_max} °C</span>
            </div>
            <div className="city-infos-2">
              <span>Pressure : {city.infos.pressure} hPa</span>
              <span>T°(C) min : {city.infos.temp_min} </span>
            </div>
          </div>
        </div>
        <div className="city-temp">{city.infos.temp}°C</div>
      </li>
    );
  };

  render() {
    let listWidget = this.props.cities
      .slice(
        this.props.pageSize * (this.props.pageIndex - 1),
        this.props.pageSize * this.props.pageIndex
      )
      .filter(city => city.name.includes(this.state.inputCity))
      .map(this.displayWidget);
    console.log("props are :", this.props);
    console.log("state is ", this.state);
    return (
      <div className="home">
        <Header title="Home" />
        <div className="home-content">
          <div className="home-content-input">
            <input
              placeholder="Search a city"
              onChange={e => this.handleChangeInput(e)}
            ></input>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
          </div>
          <div className="home-content-widgets">
            <ul className="home-content-widgets-list">{listWidget}</ul>
          </div>
        </div>

        {this.state.nbPage > 1 ? (
          <div className="footer">
            <span className="btn-page " onClick={this.handleGoBack}>
              &larr;
            </span>
            <span
              className={
                this.state.pageSelected === this.props.pageIndex
                  ? "btn-page btn-page-selected"
                  : "btn-page"
              }
              onClick={() => this.handleChangePage(0)}
            >
              {this.state.pageSelected}
            </span>
            <span
              className={
                this.state.pageSelected + 1 === this.props.pageIndex
                  ? "btn-page btn-page-selected"
                  : "btn-page"
              }
              onClick={() => this.handleChangePage(1)}
            >
              {this.state.pageSelected + 1}
            </span>
            {this.state.nbPage > 2 ? (
              <span
                className={
                  this.state.pageSelected + 2 === this.props.pageIndex
                    ? "btn-page btn-page-selected"
                    : "btn-page"
                }
                onClick={() => this.handleChangePage(2)}
              >
                {this.state.pageSelected + 2}
              </span>
            ) : null}

            <span className="btn-page " onClick={this.handleGoForward}>
              &rarr;
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  updatePageIndex: updatePageIndex
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
