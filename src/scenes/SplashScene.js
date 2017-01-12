/* The splashscreen for new users */

import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Icon} from 'react-native-elements'
import {styles, colors} from '../Styles'
import TitleBar from '../components/TitleBar'

INTRODUCTION_TEXT = 'This is the introduction';

export default class SplashScene extends Component {

  finished = () => {
    this.props.callback();
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title={'Welcome to Momentum'} />

        <View style={[styles.formContainer, {flex: 1}]}>
          <Text>{INTRODUCTION_TEXT}</Text>
        </View>
        <View style={styles.horizontal}>
          <Icon
            name={'done'}
            reverse
            color={colors.main}
            onPress={this.finished}/>
        </View>
      </View>
    )
  }
}