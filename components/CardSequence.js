import React from 'react'
import {FlatList, View, Text, StyleSheet, Dimensions} from 'react-native'

export default class CardSequence extends React.Component {
  state = { screen: Dimensions.get('screen') }

  keyExtractor = x => x.id

  renderItem = x => {
    const { item } = x

    // Show only 3 card.
    return (
      <View style={[styles.cardWrapper, {width: (this.state.screen.width / 3) - 15,}]}>
        <Text style={styles.cardLabel}>{item.label}</Text>
      </View>
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
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 30,
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
})
