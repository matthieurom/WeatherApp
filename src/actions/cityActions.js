export function setCity(city) {
  return {
    type: "SET_CITY",
    payload: city
  };
}

export function addCity(city) {
  return {
    type: "ADD_CITY",
    payload: city
  };
}

export function removeCity(city) {
  return {
    type: "REMOVE_CITY",
    payload: city
  };
}

export function updatePageIndex(index) {
  return {
    type: "UPDATE_PAGE",
    payload: index
  };
}
