import {AsyncStorage} from 'react-native'

export const getItem = async key => {
  let value = null
  try {
    value = await AsyncStorage.getItem(key)
  } catch (e) {
    // Do nothing
  }

  return value
}

export const setItem = async (key, value) => {
  let success = true
  try {
    await AsyncStorage.setItem(key, value) // Consider using `JSON.stringify`
  } catch (e) {
    // Do nothing
    success = false
  }

  return success
}
