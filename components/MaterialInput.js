import React from 'react'
import { View, TextInput, StyleSheet, Animated, Easing } from 'react-native'

export default class extends React.Component {
  animationValue = new Animated.Value(0)

  animate = toValue => {
    Animated.timing(this.animationValue,
      { toValue, easing: Easing.linear, duration: 200, }).start()
  }

  startAnimation = () => {
    this.animate(1)
  }

  clearAnimation = () => {
    this.animate(0)
  }

  render() {
    const { inputStyles, containerStyles, ...props } = this.props

    return (
      <View style={[styles.container, containerStyles]}>
        <TextInput
          {...props}
          style={[styles.input, this.props.inputStyles]}
          onFocus={this.startAnimation}
          onBlur={this.clearAnimation} />
        <View style={styles.line}>
          <Animated.View style={[styles.nestedLines, {
            marginLeft: this.animationValue.interpolate({ inputRange: [0, 1], outputRange: ['50%', '0%'] }),
          }]}></Animated.View>
          <Animated.View style={[styles.nestedLines, {
            width: this.animationValue.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
          }]}></Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 20,
  },
  line: {
    marginTop: 2,
    height: 2,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
  },
  nestedLines: {
    backgroundColor: '#00aaed',
  },
})
