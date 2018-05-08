import config from '../config/config'
import {getItem, setItem} from './storage'

const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const getResponse = (fetchUrl, fetchOptions) => {
  return fetch(fetchUrl, fetchOptions).then(response => {
    if (response.status === 401) {
      return Promise.reject(response)
    }

    if (!(response.status >= 200 && response.status < 300)) {
      return Promise.reject(response)
    }

    return response
  })
}

const getJsonResponse = (fetchUrl, fetchOptions) => {
  return getResponse(fetchUrl, fetchOptions)
    .then(r => r.text())
    .then(t => {
      if (!t) {
        return {}
      }

      return JSON.parse(t)
    })
}

let authToken = null
let refreshToken = null

const setAuth = (auth) => {
  // auth = config.auth || auth

  authToken = auth.access_token
  refreshToken = auth.refresh_token

  return Promise.resolve(auth)
}

const getJson = (url, params={}) => {
  return getJsonResponse(url, {
    ...params,
    method: 'GET',
    headers: withAuth(JSON_HEADERS),
  })
}

const postJson = (url, body, params={}) => {
  return getJsonResponse(url, {
    ...params,
    method: 'POST',
    headers: withAuth(JSON_HEADERS),
    body: JSON.stringify(body)
  })
}

export const postLogin = (username, password, realm) => {
  const formData = { username, password, realm }

  return getJsonResponse(`${config.apiUrl}/authentication/login/realms/${realm}`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(formData)
  })
  .then(setAuth)
}

const withAuth = (headers) => {
  return authToken ? {...headers, Authorization: `Bearer ${authToken}`} : headers
}


export const getUserList = () => {
  return getJsonResponse(`${config.apiUrl}/authentication/users`, {
    method: 'GET',
    headers: withAuth(JSON_HEADERS),
    mode: 'cors'
  })
}

// const hasNetworkConnection = e => {
//   if (!e.status && `${e}`.includes('Network request failed'))
// }

export const getJsonWithCache = async (url, key) => {
  let json = null

  key = key || url // TODO: Think, different scope might return different result

  try {
    json = await getJson(url)
    setItem(key, JSON.stringify(json))
  } catch (e) {
    let result = null
    // See - https://github.com/facebook/react-native/issues/8615#issuecomment-382852133
    // react-native NetInfo has `some issues`
    // TODO: Move to a separate function/method.
    if (!e.status && `${e}`.includes('Network request failed')) { // Likely, no internet connection
      result = await getItem(key)
      if (result) {
        json = JSON.parse(result)
      }
    }

    if (!result) {
      throw e
    }
  }

  return json
}

export const getAssignments = () => {
  // setAuth({})
  return getJsonWithCache(`${config.apiUrl}/assignment/assignments?allRealm=true`)
}

export const getSequences = id =>
  getJsonWithCache(`${config.apiUrl}/assignment/assignments/${id}/sequences`)

export const getSequenceCards = (id, seqId) =>
  getJsonWithCache(`${config.apiUrl}/assignment/assignments/${id}/sequences/${seqId}/cards`)

export const getAllSequenceCards = (id, s) =>
  Promise.all(s.map(x => getSequenceCards(id, x.id).then(x => ({[x.id]: r})).catch(e => [])))

export const sendDeviceToken = token => {
  return getJsonResponse(`${config.callUrl}/token`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({token})
  })
}
