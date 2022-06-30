import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/DataMocked";
const axios = require('axios').default;

let id = parseInt(window.location.pathname.replace('/Home/', ''));
const BASE_URL = "http://localhost:3000/user/" + id;

//date mocked
const profilMainData = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
const profilACTIVITY = !id ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === id);
const profilAVERAGE_SESSIONS = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
const profilPERFORMANCE = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
export const profilData = [profilMainData,profilACTIVITY,profilAVERAGE_SESSIONS,profilPERFORMANCE]



/**
 * Call API with BASE_URL/service and return promise with data needed
 * @param {String} service service as '', 'activity', 'average-sessions' or 'performance'
 * @returns {Promise}
 */

let mocked = false

  export async function api(service) {
    const url = `${BASE_URL}/${service}`;
    return axios.get(url)
    .then((profil) => {
        return profil.data.data
    })
  }

  export async function fetchName(service) {
    if (mocked === true) {
      const data = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id)
      return data[0].userInfos
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
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

