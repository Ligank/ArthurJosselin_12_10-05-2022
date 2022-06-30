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
      const newData = formatActivityData({
        sessions: data[0].sessions,
        day: data[0].sessions.day,
        kilogram: data[0].sessions.kilogram,
        calories: data[0].sessions.calories
      })
      return newData
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      const newData = formatActivityData({
        sessions: data.data.sessions,
        day: data.data.sessions.day,
        kilogram: data.data.sessions.kilogram,
        calories: data.data.sessions.calories
      })
      return newData
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchAverageSession (service) {
    if (mocked === true) {
      const data = !id ? USER_AVERAGE_SESSIONS : USER_AVERAGE_SESSIONS.filter(profil => profil.userId === id);
      const newData = formatSessionDays({
        sessions: data[0].sessions,
        day: data[0].sessions.day,
        sessionLength: data[0].sessions.sessionLength
      })
      console.log(newData)
      return newData
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      const newData = formatSessionDays({
        sessions: data.data.sessions,
        day: data.data.sessions.day,
        sessionLength: data.data.sessions.sessionLength
      })
      return newData
    } catch (err) {
      console.log('Error', err)
    }
  }

  export async function fetchPerformance (service) {
    if (mocked === true) {
      const data = !id ? USER_PERFORMANCE : USER_PERFORMANCE.filter(profil => profil.userId === id);
      const newData = formatPerformanceData({
        data: data[0].data,
        kind: data[0].kind
      })
      newData.reverse()
    }
    let response
    let data
    const url = `${BASE_URL}/${service}`;
    try {
      response = await fetch(url)
      data = await response.json()
      const newData = formatPerformanceData({
        data: data.data.data,
        kind: data.data.kind
      })
      newData.reverse()
      return newData
    } catch (err) {
      console.log('Error', err)
    }
  }

  const translation = {
    cardio: 'Cardio',
    energy: 'Energie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité'
  }
  
  function formatPerformanceData (dataOriginal) {
    const { data, kind } = dataOriginal
    const newData = []
    data.forEach(perf => {
      newData.push({
        value: perf.value,
        kind: translation[kind[perf.kind]]
      })
    })
    return newData
  }

  function formatActivityData (dataOriginal) {
    const { sessions } = dataOriginal
    const newData = []
    let date
    sessions.forEach(session => {
      date = new Date(session.day)
      newData.push({
        day: date.getDate(),
        kilogram: session.kilogram,
        calories: session.calories
      })
    })
    return newData
  }

  const jour = {
    1: 'L',
    2: 'M',
    3: 'M',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D'
  }
  
  function formatSessionDays (dataOriginal) {
    const { sessions } = dataOriginal
    const newData = []
    sessions.forEach(session => {
      newData.push({
        day: jour[session.day],
        sessionLength: session.sessionLength
      })
    })
    return newData
  }


