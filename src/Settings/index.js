import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/index";
import "./index.scss";
import { getWeatherFromCity } from "../services/getWeatherFromCity";
import { connect } from "react-redux";
import { addCity, removeCity } from "../actions/cityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const API_TOKEN = "4051ce7fe1ef8cb0d6d4bf227e129df3";

class Settings extends React.Component {
  state = {
    cityToAdd: "",
    cityToRemove: "",
    errorCaught: false,
    cityIsAdded: false
  };
  addCity = async e => {
    e.preventDefault();
    const responseFromApi = await getWeatherFromCity(
      this.state.cityToAdd,
      API_TOKEN
    );
    console.log("response from api :", responseFromApi);
    if (responseFromApi !== "ERROR") {
      this.setState({
        errorCaught: false
      });
      const weatherFromApi = responseFromApi.weather;
      const tempFromApi = responseFromApi.main;
      const weather = weatherFromApi[0];
      const newCity = {
        name: this.state.cityToAdd,
        weather: weather.main,
        icon: weather.icon,
        country: responseFromApi.sys.country,
        infos: {
          humidity: responseFromApi.main.humidity,
          pressure: responseFromApi.main.pressure,
          temp: Math.round(tempFromApi.temp - 273),
          temp_min: Math.round(responseFromApi.main.temp_min - 273),
          temp_max: Math.round(responseFromApi.main.temp_max - 273)
        }
      };
      this.props.addCity(newCity);
      this.setState({ cityToAdd: "", cityIsAdded: true });
      console.log("CITY ADDED");
    } else if (responseFromApi === "ERROR") {
      this.setState({
        errorCaught: true
      });
    }
  };

  removeCity = () => {
    this.props.removeCity(this.state.cityToRemove);
    this.setState({ cityToRemove: "", cityIsAdded: false });
    console.log("REMOVE : ", this.state.cityToRemove);
  };

  displayCityItem = city => {
    let classNameCity = "city-item";
    if (this.state.cityToRemove.name === city.name) {
      classNameCity = classNameCity + " city-selected";
    }
    return (
      <li key={city.name} onClick={() => this.setState({ cityToRemove: city })}>
        <div className={classNameCity}>{city.name}</div>
      </li>
    );
  };
  render() {
    console.log("state in settings is : ", this.state);
    let listCities = this.props.cities.map(this.displayCityItem);
    return (
      <div className="settings">
        <Header title="Settings" />
        <div className="settings-content">
          <div className="settings-content-back">
            <Link to="/">
              <button>
                <div className="settings-content-back-button">
                  Back
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </button>
            </Link>
          </div>
          <div className="settings-content-add">
            <div>
              {this.state.cityIsAdded ? (
                <span className="settings-content-added">
                  {this.props.cities[this.props.cities.length - 1].name} has
                  been added
                </span>
              ) : null}
              <span className="settings-content-title">Add a city</span>
            </div>
            <form onSubmit={this.addCity}>
              <input
                placeholder="Enter a city"
                value={this.state.cityToAdd}
                onChange={e => this.setState({ cityToAdd: e.target.value })}
              />
              <button type="submit" className="settings-content-add-button">
                Add
              </button>
            </form>
            {this.state.errorCaught ? (
              <span className="settings-content-error">
                Enter a valid city name
              </span>
            ) : null}
          </div>
          <div className="settings-content-remove">
            <span className="settings-content-title">Remove a city</span>
            <div className="settings-content-remove-content">
              <ul
                className={this.props.cities.length > 5 ? "add-scroll" : null}
              >
                {listCities}
              </ul>
              <button onClick={() => this.removeCity()}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  addCity: addCity,
  removeCity: removeCity
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Settings);
