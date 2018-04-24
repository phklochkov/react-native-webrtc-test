import React from 'react';
import {AppRegistry, Text} from 'react-native'
import NotificationsIOS from 'react-native-notifications'

import {sendDeviceToken} from './lib/http'

import Login from './Login'
import UserList from './UserList'
import Call from './Call'

// console.disableYellowBox = true

class RCTWebRTCDemo extends React.Component {
  state = {
    appState: 'main',
    username: '',
  }

  onPushRegistered = (deviceToken) => {
    // Send the token to server so it could send back push notifications...
    console.log("Device Token Received", deviceToken)
    sendDeviceToken(deviceToken)
      .then(r => console.log('result', r))
      .catch(e => console.log('error', e))
  }

  onPushRegistrationFailed = (error) => {
    console.log('push notification error', error)
  }

  componentDidMount() {
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered)
    NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed)
    NotificationsIOS.requestPermissions()
  }

  componentWillUnmount() {
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered)
		NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed)
  }

  setAppState = (appState) => {
    this.setState({ appState })
  }

  setUsername = (username) => {
    this.setState({ username })
  }

  render() {
    const { appState } = this.state

    switch (appState) {
      case 'login':
        return <Login onSetAppState={this.setAppState} />
      case 'list':
        return <UserList onSetAppState={this.setAppState} onSetUsername={this.setUsername} />
      case 'main':
        return <Call onSetAppState={this.setAppState} username={this.state.username} />
      default:
        return <Text style={{justifyContent: 'center', color: 'red', fontSize: 22,}}>Oops...</Text>
    }
  }
}

AppRegistry.registerComponent('RCTWebRTCDemo', () => RCTWebRTCDemo)
