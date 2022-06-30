import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/DataMocked";

let id = parseInt(window.location.pathname.replace('/Home/', ''));
const BASE_URL = "http://localhost:3000/user/" + id;


/**
 * Call API with BASE_URL/service and return with data needed
 * @param {String} service service as '', 'activity', 'average-sessions' or 'performance'
 * @returns {data}
 */

let mocked = false //switch beetween data mocked or API

  export async function fetchName(service) {
    if (mocked === true) {
      const data = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id)
      console.log('data mocked')
      return data[0].userInfos
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      console.log('data API')
      return data.data.userInfos
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchFood (service) {
    if (mocked === true) {
      const data = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id)
      return data[0].keyData
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      return data.data.keyData
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchScore (service) {
    if (mocked === true) {
      const data = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id)
      return data[0].todayScore
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      return data.data.todayScore
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchActivity (service) {
    if (mocked === true) {
      const data = !id ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === id);
      return data[0]
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      return data.data
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchAverageSession (service) {
    if (mocked === true) {
      const data = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
      return data[0]
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      
      return data.data
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchPerformance (service) {
    if (mocked === true) {
      const data = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
      return data[0]
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      return data.data
    } catch (err) {
      console.log('Error', err)
    }
  }

