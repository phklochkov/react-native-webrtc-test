import React from 'react'
import {FlatList, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

export default class CardSequence extends React.Component {
  state = { screen: Dimensions.get('screen') }

  keyExtractor = x => x.id

  renderItem = x => {
    const { item } = x
    const disabled = !item.component || item.component.componentType !== 'openSequence'
    const onCardPress = () => {
      this.props.onCardPress(item.id)
    }

    // Show only 3 card.
    return (
      <TouchableOpacity
        style={[styles.cardWrapper, {width: (this.state.screen.width / 3) - 15,}]}
        disabled={disabled}
        onPress={onCardPress}>
        {/* <View> */}
          <Text style={styles.cardLabel}>{item.label}</Text>
        {/* </View> */}
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
    borderBottomColor: '#414042',
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
