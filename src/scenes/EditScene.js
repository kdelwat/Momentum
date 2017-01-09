/* The edit task scene */

import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {FormLabel, FormInput, Text, Button} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import 'moment/locale/en-au'

import {styles} from '../Styles'
import TitleBar from '../components/TitleBar'

const TIMEDATE_FORMAT = 'YYYY-MM-DD HH:mm';

export default class EditScene extends Component {

  // Initialise state with the parameters of the edited task.
  // This means that any unchanged field will remain the same.
  state = {
    title: this.props.task.title,
    active: this.props.task.active.format(TIMEDATE_FORMAT),
    deadline: this.props.task.deadline.format(TIMEDATE_FORMAT),
  };

  // When finished editing, create a new task and call the callback function with the task id
  // and the new task
  finished = () => {
    const oldTask = this.props.task;
    const newTask = {
      title: this.state.title,
      id: oldTask.id,
      completed: oldTask.completed,
      active: moment(this.state.active),
      deadline: moment(this.state.deadline),
    };
    this.props.callback(this.props.task.id, newTask);
    this._return();
  };

  // Pop the EditScene off the navigation stack, returning to MainScene
  _return () {
    this.props.navigator.pop();
  }

  // Listeners that update the state on input
  onChangeText = (title) => this.setState({title: title});
  onChangeDeadline = (date) => this.setState({deadline: date});
  onChangeActive = (date) => this.setState({active: date});
  setActiveToDeadline = () => this.setState({active: this.state.deadline});

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title={this.props.sceneTitle} />
        <FormLabel>Title</FormLabel>
        <FormInput placeholder={this.props.task.title}
                   onChangeText={this.onChangeText}/>
        <FormLabel>Deadline</FormLabel>
        <DatePicker
          date={this.state.deadline}
          mode="datetime"
          format={TIMEDATE_FORMAT}
          onDateChange={this.onChangeDeadline}
        />
        <FormLabel>Active</FormLabel>
        <DatePicker
          date={this.state.active}
          mode="datetime"
          format={TIMEDATE_FORMAT}
          onDateChange={this.onChangeActive}
        />
        <Button title="Same as deadline"
                raised
                onPress={this.setActiveToDeadline} />
        <Button title="Done"
                raised
                onPress={this.finished}/>
      </View>
    )
  }
}