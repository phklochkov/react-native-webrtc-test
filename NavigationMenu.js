import React from 'react'
import {ScrollView, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'

const NavigationItem = props =>
  <TouchableOpacity style={styles.navigationItem} onPress={props.onPress}>
    <Image style={styles.itemImg} source={props.img} />
    <Text style={styles.itemText}>{props.text}</Text>
  </TouchableOpacity>

export default props =>
  <ScrollView style={styles.wrapper}>
    {props.items.map(x =>
      <NavigationItem key={x.path} img={x.img} text={x.text} onPress={() => props.onNavigate(x.path)} />)}
  </ScrollView>

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flex: 1,
  },
  navigationItem: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
  },
  itemImg: {},
})
