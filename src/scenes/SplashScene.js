/* The splashscreen for new users */

import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Icon} from 'react-native-elements'
import {styles, colors} from '../Styles'
import TitleBar from '../components/TitleBar'

const TEXT_PADDING=10;

export default class SplashScene extends Component {

  finished = () => {
    this.props.callback();
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title={'Welcome to Momentum'}/>

        <View style={[styles.formContainer, {flex: 1, marginTop: 30}]}>
          <Text style={{marginBottom: TEXT_PADDING}}>Momentum is a task management app with a simple philosophy.</Text>
          <Text style={{marginBottom: TEXT_PADDING}}>
            <Text style={{fontWeight: 'bold'}}>Tasks</Text> are items with a set finish point.
            They have three states:
          </Text>
          <Text style={{marginBottom: TEXT_PADDING}}>
            {'\t\t'}<Text style={{fontWeight: 'bold'}}>Active</Text> tasks are those which are ready to work on.{'\n'}
            {'\t\t'}<Text style={{fontWeight: 'bold'}}>Upcoming</Text> tasks are those yet to become active.{'\n'}
            {'\t\t'}<Text style={{fontWeight: 'bold'}}>Completed</Text> tasks are those already finished.{'\n'}
          </Text>
          <Text style={{marginBottom: TEXT_PADDING}}>
            When a task is created, both a deadline and a date to become active can be specified.
            To edit a task, press on it. To complete a task, press and hold.
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Notes</Text> are items with no deadline.
            They are automatically classed as active until completed.
          </Text>
        </View>
        <View style={styles.horizontal}>
          <Icon
            name={'done'}
            reverse
            color={colors.priority4}
            onPress={this.finished}/>
        </View>
      </View>
    )
  }
}