import React from 'react';
import {AppRegistry, Text} from 'react-native'

import Login from './Login'
import UserList from './UserList'
import Call from './Call'

// console.disableYellowBox = true

class RCTWebRTCDemo extends React.Component {
  state = {
    appState: 'main',
    username: '',
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
