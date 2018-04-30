import React from 'react'
import { View, TextInput, Text, StyleSheet, Animated, Easing } from 'react-native'

export default class extends React.Component {
  animationValue = new Animated.Value(0)

  state = {isFocused: false, hasValue: false}

  animate = toValue => {
    Animated.timing(this.animationValue,
      { toValue, easing: Easing.linear, duration: 250, }).start()
  }

  startAnimation = () => {
    this.animate(1)
    this.setState({isFocused: true})
  }

  clearAnimation = () => {
    this.animate(0)
    this.setState({isFocused: false})
  }

  onChangeText = v => {
    this.props.onChangeText(v)

    if (this.state.hasValue !== !!v) {
      this.setState({hasValue: !!v})
    }
  }

  interpolate = (outputRange, stopAnimating) => {
    if (stopAnimating) {
      const a = new Animated.Value(1)
      return a.interpolate({ outputRange, inputRange: [0, 1] })
    } else {
      return this.animationValue.interpolate({ outputRange, inputRange: [0, 1] })
    }
  }

  render() {
    const { inputStyles, containerStyles, label, labelStyle, ...props } = this.props
    const { isFocused, hasValue } = this.state
    const isLabelFloats = hasValue || isFocused

    return (
      <View style={[styles.container, containerStyles]}>
        {label && <Animated.Text style={[styles.inputLabel, labelStyle, isLabelFloats && {
          color: isFocused ? '#00aaed' : 'rgba(0, 0, 0, 0.3)',
          transform: [
            {scale: this.interpolate([1, 0.7], hasValue)},
            {translateY: this.interpolate([0, -24], hasValue)},
            {translateX: this.interpolate([0, -10], hasValue)},
          ]
        }]}>{label}</Animated.Text>}
        <TextInput
          {...props}
          onChangeText={this.onChangeText}
          style={[styles.input, this.props.inputStyles]}
          onFocus={this.startAnimation}
          onBlur={this.clearAnimation} />
        <View style={styles.line}>
          <Animated.View style={[styles.nestedLines, {
            marginLeft: this.interpolate(['50%', '0%']),
          }]}></Animated.View>
          <Animated.View style={[styles.nestedLines, {
            width: this.interpolate(['0%', '100%'])
          }]}></Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 3,
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
