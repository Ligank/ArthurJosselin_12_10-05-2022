import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/DataMocked";
const axios = require('axios').default;


let id = parseInt(window.location.pathname.replace('/Home/', ''));

//date mocked
const profilMainData = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
const profilACTIVITY = !id ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === id);
const profilAVERAGE_SESSIONS = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
const profilPERFORMANCE = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
export const profilData = [profilMainData,profilACTIVITY,profilAVERAGE_SESSIONS,profilPERFORMANCE]

const BASE_URL = "http://localhost:3000/user/" + id;
export async function api(service) {
  const url = `${BASE_URL}/${service}`;
  return axios.get(url)
  .then((profil) => {
    console.log(profil.data.data)
      return profil.data.data
  })
}


