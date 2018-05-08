import React from 'react'
import {FlatList, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

export default class CardSequence extends React.Component {
  state = { screen: Dimensions.get('screen') }

  keyExtractor = x => x.id

  renderItem = x => {
    const { item } = x
    const onCardPress = () => {
      this.props.onCardPress(item.id)
    }
    const disabled = !item.component || item.component.componentType !== 'openSequence'
    const wrapperStyle = {
      width: (this.state.screen.width / 3) - 15,
      borderBottomColor: disabled ? '#414042' : '#00aaed'
    }

    // Show only 3 cards.
    return (
      <TouchableOpacity
        style={[styles.cardWrapper, wrapperStyle]}
        disabled={disabled}
        onPress={onCardPress}>
          <Text style={styles.cardLabel}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  onScreenOrientationChange = e => {
    this.setState({screen: e.screen})
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onScreenOrientationChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onScreenOrientationChange)
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.returnIcon}>&#9650;</Text>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          data={this.props.cards}
          extraData={this.state.screen}
          renderItem={this.renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    marginHorizontal: 5,
    flexWrap: 'wrap',
    borderBottomWidth: 5,
  },
  cardLabel: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  returnIcon: {
    color: '#fff',
    fontSize: 30,
    transform: [{scaleX: 2}],
    alignSelf: 'center',
  },
})
