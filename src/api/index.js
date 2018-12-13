import AuthService from '../services'
const BASE = 'http://localhost:3000'

let auth = new AuthService()

let getApartments = function() {
  return authFetch(BASE + '/apartments')
  .then((resp) => {
    let json = resp.json();
    return json;
  })
}

let getApartment = function(id) {
  return authFetch(BASE + '/apartments/'+id)
  .then((resp) => {
    let json = resp.json();
    return json;
  })
}

let createApartment = function(apt) {
  return authFetch(BASE + '/apartments', {
    body: JSON.stringify(apt),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST"
  })
    .then((resp) => {
      let json = resp.json()
      console.log(json);
      return json
    })
}

let deleteApartment = function(id) {
  return authFetch(BASE + '/apartments/' + id, {
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then((resp) => {
      let json = resp
      console.log(json);
      return json
    })
}

let getUserApartments = function(user_id) {
  return authFetch(BASE + `/users/apartments/${user_id}`)
    .then((resp) => {
      let json = resp.json();
      console.log("getUserApartments json: "+json);
      return json;
  })
}

let editApartment = function(apt){
  let id = apt.id
  console.log(apt);
  return authFetch(BASE + '/apartments/'+id, {
    body: JSON.stringify(apt),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "PATCH"
  })
  .then(resp => {
    let json = resp.json()
    return json
  })
}

let getProfile = function(user_id){
  return authFetch(BASE + `/profiles/${user_id}`)
  .then(resp => {
    console.log(resp);
    let json = resp.json()
    return json
  })
}

let authFetch = (url, options) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (auth.loggedIn()) {
    headers['Authorization'] = 'Bearer ' + auth.getToken()
  }

  return fetch(url, {
    headers,
    ...options
  })
  .then(apiResponse => auth._checkStatus(apiResponse))
  .catch(err => {
    console.log("::: FETCH ERROR CAUGHT:::", err)
    return err
  })
}

export { getApartments, getApartment, createApartment, deleteApartment, getUserApartments, editApartment, getProfile }
