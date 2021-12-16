import axios from 'axios'

export function getDogs() {
  return async function (dispatch) {
    const json = await axios.get('http://localhost:3001/api/dogs/')
    return dispatch({
      type: 'GET_DOGS',
      payload: json.data,
    })
  }
}

export function getTemps() {
  return async function (dispatch) {
    const json = await axios.get('http://localhost:3001/api/temps/')
    return dispatch({
      type: 'GET_TEMPS',
      payload: json.data,
    })
  }
}

export function filterByTemp(payload) {
  return {
    type: 'FILTER_TEMP',
    payload,
  }
}

export function filterAlph(payload) {
  return {
    type: 'FILTER_ALPH',
    payload,
  }
}

export function filterWeight(payload) {
  return {
    type: 'FILTER_WEIGHT',
    payload,
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload,
  }
}

export function filterBySearch(name) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/api/dogs/?name=${name}`)
    if (json.data.error === true) {
      return dispatch({
        type: 'GET_DOGS_NAME',
        payload: [
          {
            error: 'Oops! No matches found',
            img: 'https://i.pinimg.com/originals/45/8f/ca/458fcaa788420ffdac5855ec7ef62ff8.jpg',
          },
        ],
      })
    } else {
      return dispatch({
        type: 'GET_DOGS_NAME',
        payload: json.data,
      })
    }
  }
}

export async function postNewDog(newDog) {
  try {
    await axios.post('http://localhost:3001/api/dogs', newDog)
    return true
  } catch (error) {
    return false
  }
}

export function getDogById(id) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/api/dogs/${id}`)
    return dispatch({
      type: 'GET_DOG_DETAIL',
      payload: json.data,
    })
  }
}
