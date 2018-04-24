const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const BASE_US_URL = 'https://api.dev.steelgoldfish.io/v1'
const BASE_RTC_URL = 'http://172.26.8.180:4443'

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
  authToken = auth.access_token
  refreshToken = auth.refresh_token

  return Promise.resolve(auth)
}

export const postLogin = (username, password, realm) => {
  const formData = { username, password, realm }

  return getJsonResponse(`${BASE_US_URL}/authentication/login/realms/${realm}`, {
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
  return getJsonResponse(`${BASE_US_URL}/authentication/users`, {
    method: 'GET',
    headers: withAuth(JSON_HEADERS),
    mode: 'cors'
  })
}

export const sendDeviceToken = token => {
  return getJsonResponse(`${BASE_RTC_URL}/token`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({token})
  })
}
