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

//Find URl of client with his ID
const BASE_URL = "http://localhost:3000/user/" + id;

/**
 * Call API with BASE_URL/service and return promise with data needed
 * @param {String} service service as '', 'activity', 'average-sessions' or 'performance'
 * @returns {Promise}
 */

export async function api(service) {
  const url = `${BASE_URL}/${service}`;
  return axios.get(url)
  .then((profil) => {
      return profil.data.data
  })
}

function App() {
  const [profil, setProfil] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let data = api('')

  useEffect(() => {
    data.then(response => {
      setProfil(response);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  },)}

