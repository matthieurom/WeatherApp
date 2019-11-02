const initialState = {
  pageSize: 5,
  pageIndex: 1,
  cities: [
    {
      name: "Paris",
      country: "FR",
      weather: "Clouds",
      icon: "04d",
      infos: {
        humidity: 81,
        pressure: 1017,
        temp: 12,
        temp_max: 12,
        temp_min: 10
      }
    },
    {
      name: "Montpellier",
      country: "FR",
      weather: "Clouds",
      icon: "04d",
      infos: {
        humidity: 63,
        pressure: 1016,
        temp: 18,
        temp_max: 20,
        temp_min: 17
      }
    },
    {
      name: "Nîmes",
      country: "FR",
      weather: "Clouds",
      icon: "04d",
      infos: {
        humidity: 81,
        pressure: 1017,
        temp: 12,
        temp_max: 12,
        temp_min: 10
      }
    }
  ]
};

export default function cityReducer(state = initialState, action) {
  let newCity;

  switch (action.type) {
    case "ADD_CITY":
      newCity = state.cities.concat(action.payload);
      return { ...state, cities: newCity };

    case "REMOVE_CITY":
      newCity = state.cities.filter(city => city.name !== action.payload.name);
      return { ...state, cities: newCity };

    case "UPDATE_PAGE":
      return { ...state, pageIndex: action.payload };
    default:
      return state;
  }
}
