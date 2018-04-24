import React from 'react'
import {ScrollView, Image, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import {getUserList} from './lib/http'

export default class extends React.Component {
  state = {users: []}

  componentDidMount() {
    getUserList().then(users => {
      this.setState({users: users.slice(0, 50)})
    })
    .error(e => console.log('error', e))
  }

  onItemPress = u => {
    this.props.onSetAppState('main')
    this.props.onSetUsername(u.username)
  }

  renderUserItem = () => {
    if ((this.state.users || []).length === 0) {
      return <ActivityIndicator style={{justifyContent: 'center'}} size="large" color="#00aaed" />
    }

    return this.state.users.map(x => {
      return (
        <TouchableOpacity key={x.id} onPress={() => this.onItemPress(x)}>
          <View style={styles.item}>
            <View style={styles.itemIconContainer}>
              <Image source={require('./user-icon.png')} style={styles.itemIcon} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{`Name: ${x.firstName || ''} ${x.lastName || ''}`.trim()}</Text>
              <Text style={styles.itemText}>{`Username: ${x.username}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderUserItem()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#00aaed',
  },
  itemText: {
    fontSize: 20,
  },
  itemIconContainer: {
    flex: 0.2,
  },
  itemIcon: {
    width: 48,
    height: 48,
  },
  itemDetails: {
    flex: 0.8,
    justifyContent: 'flex-end'
  },
})
