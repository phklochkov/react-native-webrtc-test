import React from 'React'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ListView,
} from 'react-native'
import MaterialInput from './components/MaterialInput'

export const TextRoom = props => {
  return (
    <View style={styles.textRoomWrapper}>
      <ListView
        dataSource={props.ds.cloneWithRows(props.data)}
        renderRow={r => <Text>{`${r.user}: ${r.message}`}</Text>} />
      <View style={styles.messageInputWrapper}>
        <View style={styles.inputContainer}>
          <MaterialInput
            contextMenuHidden={true}
            autoCapitalize = 'none'
            onChangeText={props.onChangeText}
            value={props.value} />
        </View>
        <TouchableOpacity onPress={props.onSend}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textRoomWrapper: {
    height: 150,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  sendButton: {
    fontSize: 18,
    color: '#007AFF',
    marginHorizontal: 10,
  },
})
