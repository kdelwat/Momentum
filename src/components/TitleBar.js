import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {styles} from '../Styles'

export default class TitleBar extends Component {

  render() {
    return (
      <View style={[styles.horizontal, styles.titleBar]}>
        <Text style={styles.titleText}>{this.props.title.toUpperCase()}</Text>
      </View>
    )
  }
}