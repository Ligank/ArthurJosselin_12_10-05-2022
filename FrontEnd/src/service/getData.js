import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/DataMocked";
import React, { useEffect, useState, Component } from "react";
const axios = require('axios').default;


let id = parseInt(window.location.pathname.replace('/Home/', ''));

//date mocked
const profilMainData = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
const profilACTIVITY = !id ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === id);
const profilAVERAGE_SESSIONS = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
const profilPERFORMANCE = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
export const profilData = [profilMainData,profilACTIVITY,profilAVERAGE_SESSIONS,profilPERFORMANCE]



//API
export const profilMainData2 = axios.get('/user/' + id)
.then((profil) => {
    return profil.data.data
})

export const profilACTIVITY2 = axios.get('/user/' + id + '/activity')
.then((profil) => {
    return profil.data.data
})

export const profilAVERAGE_SESSIONS2 = axios.get('/user/' + id + '/average-sessions')
.then((profil) => {
    return profil.data.data
})

export const profilPERFORMANCE2 = axios.get('/user/' + id + '/performance')
.then((profil) => {
    return profil.data.data
})

export const profilPERFORMANCE3 = axios.get('http://localhost:3000/user/18')
.then((profil) => {
    return profil.data.data
})


const profilData3 = [profilMainData2,profilACTIVITY2,profilAVERAGE_SESSIONS2,profilPERFORMANCE2]


export const profilData2 = profilData3

const BASE_URL = "http://localhost:3000/user/" + id;
const urls = {
  name: BASE_URL + "/user/" + id,
  activity: BASE_URL + "/user/" + id + "/activity",
  average_sessions: BASE_URL + "/user/" + id + "/average-sessions",
  performance : BASE_URL + "/user/" + id + "/performance",
  food: BASE_URL + "/user/" + id,
  score: BASE_URL + "/user/" + id
}

export async function sportSeeApi(service) {
  const url = `${BASE_URL}/${service}`;
  return axios.get(url)
  .then((profil) => {
      return profil.data.data
  })
}

