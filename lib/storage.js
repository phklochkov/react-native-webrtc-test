import {AsyncStorage} from 'react-native'

export const getItem = async key => {
  return AsyncStorage.getItem(key)
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
