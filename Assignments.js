import React from 'react'
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native'
import {getAssignments, getSequences, getSequenceCards, getAllSequenceCards} from './lib/http'
import CardSequence from './components/CardSequence'

export default class extends React.Component {
  state = {assignments: [], isLoading: false, sequences: [], cards: [], assignmentId: null}

  keyExtractor = x => x.id

  renderItem = x => {
    const { item } = x
    const { isLoading } = this.state
    const onItemPress = () => {
      this.getSequence(item.id)
    }

    return (
      <TouchableOpacity style={styles.listItem} disabled={this.state.isLoading}
        delayPressIn={20} onPress={onItemPress}>
        <Text style={[styles.listItemName, {opacity: isLoading ? 0.5 : 1}]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  getSequence = async id => {
    this.setState({isLoading: true})
    try {
      const sequences = await getSequences(id)
      const s = sequences.find(x => x.id === 'root') // Find root sequence.

      if (s) {
        const cards = await getSequenceCards(id, s.id)
        if (cards && cards.length) {
          this.setState({sequences, cards, assignmentId: id, isLoading: false})
        }
      }
    } catch (e) {
      this.setState({isLoading: false})
      console.log('Failed to load sequence', e)
    }
  }

  sortAssignments = (a, f) => a.sort((a, b) => new Date(b[f]) - new Date(a[f]))

  renderAssignmentsList = () => {
    return (
      <View style={styles.assignmentWrapper}>
        <Text style={styles.title}>Assignment List</Text>
        <FlatList
          data={this.state.assignments}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem} />
      </View>
    )
  }

  onCardPress = async seqId => {
    if (!this.state.assignmentId) {
      return
    }

    this.setState({isLoading: true})
    try {
      const cards = await getSequenceCards(this.state.assignmentId, seqId)
      if (cards && cards.length) {
        this.setState({cards, isLoading: false})
      }
    } catch (e) {
      this.setState({isLoading: false})
    }
  }

  async componentDidMount() {
    try {
      const assignments = await getAssignments()
      this.setState({ assignments: this.sortAssignments(assignments) })
    } catch (e) {
      console.log('Failed to load assignments', e)
    }
  }

  render() {
    const { cards } = this.state

    return (
      <View style={styles.wrapper}>
        {cards && cards.length ? <CardSequence
          cards={cards}
          onCardPress={this.onCardPress} /> :
          this.renderAssignmentsList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  assignmentWrapper: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'center',
  },
  listItem: {
    justifyContent: 'center',
    padding: 15,
    marginVertical: 2,
    backgroundColor: '#ededed',
  },
  listItemName: {
    fontSize: 14,
  },
})
