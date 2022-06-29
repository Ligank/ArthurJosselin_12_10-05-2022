import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/DataMocked";
import { useState, useEffect } from "react";
const axios = require('axios').default;


let id = parseInt(window.location.pathname.replace('/Home/', ''));

//date mocked
const profilMainData = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
const profilACTIVITY = !id ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === id);
const profilAVERAGE_SESSIONS = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
const profilPERFORMANCE = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
export const profilData = [profilMainData,profilACTIVITY,profilAVERAGE_SESSIONS,profilPERFORMANCE]


const BASE_URL = "http://localhost:3000/user/" + id;

/**
 * Call API with BASE_URL/service and return promise with data needed
 * @param {String} service service as '', 'activity', 'average-sessions' or 'performance'
 * @returns {Promise}
 */


export async function useApi(service) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `${BASE_URL}/${service}`;
  const response = await fetch(url);
  const data2 = await response.json();
  setData(data2)
  return data
  }

  export async function api(service) {
    const url = `${BASE_URL}/${service}`;
    return axios.get(url)
    .then((profil) => {
        return profil.data.data
    })
  }

  export async function fetchInformationUserInfo(service) {
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      return data.data.userInfos
    } catch (err) {
      console.log('----- Error -----', err)
    }
  }

