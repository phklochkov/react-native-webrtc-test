import React from 'react'
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet,
  TouchableOpacity, Button, Image} from 'react-native'
import {postLogin} from './lib/http'
import MaterialInput from './components/MaterialInput'

export default class extends React.Component {
  state = { domain: '', login: '', password: '', error: null }

  onChange = (p, v) => {
    this.setState({[p]: v, error: null})
  }

  onSubmit = () => {
    const {domain, login, password} = this.state
    if (domain && login && password) {
      postLogin(login.trim(), password.trim(), domain.trim())
        .then(a => {
          // this.props.onSetAppState('list')
          this.props.onSetAppState('navmenu')
        })
        .catch(e => {
          console.log('e', e)
          this.setState({error: 'Invalid credentials!'})
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <Image source={require('./skylight-logo.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <MaterialInput
            label="Domain"
            inputStyles={styles.input}
            contextMenuHidden={true}
            autoCapitalize = 'none'
            onChangeText={v => this.onChange('domain', v)}
            value={this.state.domain} />
        </View>

        <View style={styles.inputContainer}>
          <MaterialInput
            label="Login"
            inputStyles={styles.input}
            contextMenuHidden={true}
            autoCapitalize = 'none'
            onChangeText={v => this.onChange('login', v)}
            value={this.state.login} />
        </View>

        <View style={styles.inputContainer}>
          <MaterialInput
            label="Password"
            inputStyles={styles.input}
            contextMenuHidden={true}
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText={v => this.onChange('password', v)}
            value={this.state.password} />
        </View>

      <TouchableOpacity>
        <Button title="Submit" onPress={this.onSubmit} />
      </TouchableOpacity>
      {this.state.error && <Text style={styles.errorText}>{this.state.error}</Text>}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    marginTop: 10,
  },
  errorText: {
    color: '#ff0033',
    fontSize: 18,
    marginTop: 30,
  },
})
