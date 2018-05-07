import React from 'react'
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native'
import {getAssignments, getSequences, getSequenceCards, getAllSequenceCards} from './lib/http'
import CardSequence from './components/CardSequence'

export default class extends React.Component {
  state = {assignments: [], isLoading: false, sequences: [], cards: [], assignmentId: null, path: []}

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
          this.setState(state => ({sequences, cards, assignmentId: id, isLoading: false, path: [...state.path, s.id]}))
          return
        }
      }

      this.setState({isLoading: false})
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
        this.setState(s => ({cards, isLoading: false, path: [...s.path, seqId]}))
      }
    } catch (e) {
      this.setState({isLoading: false})
    }
  }

  onPrevSequence = () => {
    const {path} = this.state
    if (path.length > 1) {
      const seqId = path.slice(-2)[0]
      this.setState({path: path.slice(0, -2)})
      this.onCardPress(seqId)
    } else {
      this.setState({assignmentId: null, cards: [], sequences: [], path: []})
    }
  }

  async componentDidMount() {
    try {
      const assignments = await getAssignments()
      this.setState({ assignments: this.sortAssignments(assignments, 'created') })
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
          onCardPress={this.onCardPress}
          onBack={this.onPrevSequence} /> :
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
