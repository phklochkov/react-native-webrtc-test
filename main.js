import React from 'react';
import {AppRegistry, Text} from 'react-native'
import NotificationsIOS from 'react-native-notifications'

import Analytics from 'appcenter-analytics'

import {sendDeviceToken} from './lib/http'

import Login from './Login'
import UserList from './UserList'
import Call from './Call'

console.disableYellowBox = true

const checkAnalytics = () => {
  return Analytics.isEnabled()
    .then(enabled => {
      if (!enabled) {
        console.log('Analytics is disabled, enabling...')
        return Analytics.setEnabled(true)
      }

      return Promise.resolve()
    })
    .then(r => console.log('Analytics is enabled!', r))
    .catch(e => console.log('Analytics enable error.'))
}

class RCTWebRTCDemo extends React.Component {
  state = {
    appState: 'main',
    username: '',
    token: null
  }

  onPushRegistered = (deviceToken) => {
    // Send the token to server so it could send back push notifications...
    console.log("Device Token Received", deviceToken)
    sendDeviceToken(deviceToken)
      .then(r => {
        this.setState({token: deviceToken})
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  onPushRegistrationFailed = (error) => {
    console.log('push notification error', error)
  }

  componentDidMount() {
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered)
    NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed)
    NotificationsIOS.requestPermissions()

    Analytics.trackEvent('Application has started.')
      .then(x => {console.log('success', x)})
      .catch(e => {console.log('error', e)})

    checkAnalytics()
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
        return <Call
          onSetAppState={this.setAppState}
          username={this.state.username}
          token={this.state.token} />
      default:
        return <Text style={{justifyContent: 'center', color: 'red', fontSize: 22,}}>Oops...</Text>
    }
  }
}

AppRegistry.registerComponent('RCTWebRTCDemo', () => RCTWebRTCDemo)
