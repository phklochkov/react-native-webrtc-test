import React from 'react'
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet,
  TouchableOpacity, Button, Image} from 'react-native'
import {postLogin} from './http'

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
          this.props.onSetAppState('list')
        })
        .catch(e => {
          console.log('e', e)
          this.setState({error: 'Invalid credentials!'})
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">

        <Image source={require('./skylight-logo.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <Text>Domain: </Text>
          <TextInput
            autoCapitalize = 'none'
            style={styles.input}
            onChangeText={v => this.onChange('domain', v)}
            value={this.state.domain} />
        </View>

        <View style={styles.inputContainer}>
          <Text>Login: </Text>
          <TextInput
            autoCapitalize = 'none'
            style={styles.input}
            onChangeText={v => this.onChange('login', v)}
            value={this.state.login} />
        </View>

        <View style={styles.inputContainer}>
          <Text>Password: </Text>
          <TextInput
            autoCapitalize = 'none'
            secureTextEntry={true}
            style={styles.input}
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
    width: 220,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
    // width:  '120%',
    borderBottomColor: '#00aaed',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  input: {
    height: 40,
  },
  errorText: {
    color: '#ff0033',
    fontSize: 18,
    marginTop: 30,
  },
})
