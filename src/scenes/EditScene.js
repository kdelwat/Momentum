/* The edit task scene */

import React, {Component, DeviceEventEmitter} from 'react'
import {View, StyleSheet, TextInput, ScrollView} from 'react-native'
import {Text, Button, ButtonGroup} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Notification from 'react-native-system-notification'
import moment from 'moment'
import 'moment/locale/en-au'

import {styles, colors} from '../Styles'
import TitleBar from '../components/TitleBar'

const TIMEDATE_FORMAT = 'YYYY-MM-DD HH:mm';

export default class EditScene extends Component {

  // Initialise state with the parameters of the edited task.
  // This means that any unchanged field will remain the same.
  state = {
    title: this.props.task.title,
    description: this.props.task.description,
    active: this.props.task.active.format(TIMEDATE_FORMAT),
    deadline: this.props.task.deadline.format(TIMEDATE_FORMAT),
    note: this.isNote(),
    mode: this.isNote() ? 1 : 0, // mode 0 is a task, mode 1 is a note
  };

  // Return true when the edited item is a note, false otherwise
  isNote() {
    if (this.props.task.hasOwnProperty('note') && this.props.task.note === true) {
      return true;
    } else {
      return false;
    }
  }

  // When finished editing, create a new task and call the callback function with the task id
  // and the new task
  finished = () => {
    this.scheduleNotifications();

    const oldTask = this.props.task;
    const newTask = {
      title: this.state.title,
      description: this.state.description,
      id: oldTask.id,
      completed: oldTask.completed,
      active: moment(this.state.active),
      deadline: moment(this.state.deadline),
      note: this.state.note,
    };
    this.props.callback(this.props.task.id, newTask);
    this._return();
  };

  scheduleNotifications() {
    const deadlineMoment = moment(this.state.deadline);
    const activeMoment = moment(this.state.active);

    const deadlineNotificationID = this.props.task.id;
    const activeNotificationID = this.props.task.id * 100000;

    // Check if active date has changed
    if (this.props.task.active.diff(activeMoment) !== 0) {
      // If there is an existing notification for the task, delete it
      Notification.find(activeNotificationID).then(_ => Notification.delete(activeNotificationID))
                                             .catch(_ => {});

      // Schedule a notification for the active time
      Notification.create({
        id: activeNotificationID,
        subject: 'Task is now active',
        message: this.state.title,
        sendAt: activeMoment.toDate(),
      });
    }

    // Check if deadline date has changed
    if (this.props.task.deadline.diff(deadlineMoment) !== 0) {
      // If there is an existing notification for the task, delete it
      Notification.find(deadlineNotificationID).then(_ => Notification.delete(deadlineNotificationID))
                                               .catch(_ => {});

      // Schedule a notification for one hour before the deadline
      Notification.create({
        id: deadlineNotificationID,
        subject: 'Upcoming deadline',
        message: this.state.title,
        sendAt: deadlineMoment.subtract(1, 'hours').toDate(),
      });
    }
  }

  // Pop the EditScene off the navigation stack, returning to MainScene
  _return () {
    this.props.navigator.pop();
  }

  // Listeners that update the state on input
  onChangeText = (title) => this.setState({title: title});
  onChangeDescription = (description) => this.setState({description: description});
  onChangeDeadline = (date) => this.setState({deadline: date});
  onChangeActive = (date) => this.setState({active: date});
  setActiveToDeadline = () => this.setState({active: this.state.deadline});

  // Update the current mode (task or note).
  updateMode = (newMode) => this.setState({mode: newMode, note: !!newMode});

  // Conditionally render the date and time choosers for tasks only
  renderDateTimePicker() {
    if (this.state.mode === 1) {
      return;
    } else {
      return (
        <View>
          <Text style={styles.formLabel}>Deadline</Text>
          <View style={styles.horizontal}>
            <DatePicker
              date={this.state.deadline}
              mode="datetime"
              format={TIMEDATE_FORMAT}
              onDateChange={this.onChangeDeadline}
              style={styles.datepicker}
              showIcon={false}
              customStyles={{dateInput: styles.dateInput,
                               dateText: styles.textInput}}
            />
          </View>

          <Text style={[styles.formLabel, {marginTop: 20}]}>Active</Text>
          <View style={[styles.horizontal, {marginBottom: 12, alignItems:'flex-end'}]}>
            <DatePicker
              date={this.state.active}
              mode="datetime"
              format={TIMEDATE_FORMAT}
              onDateChange={this.onChangeActive}
              style={styles.datepicker}
              showIcon={false}
              customStyles={{dateInput: styles.dateInput,
                               dateText: styles.textInput}}
            />
            <Button title="Deadline"
                    onPress={this.setActiveToDeadline}
                    backgroundColor={colors.main}
                    buttonStyle={styles.formButton}
                    icon={{name: 'arrow-upward'}}/>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.formContainer]}>

        <TitleBar title={this.props.sceneTitle} />

        <ButtonGroup buttons={['Task', 'Note']}
                     selectedIndex={this.state.mode}
                     onPress={this.updateMode}
                     containerStyle={{height: 40,
                                      marginBottom: 10,
                                      marginLeft: 0,
                                      marginRight: 0}}/>

        <Text style={styles.formLabel}>Title</Text>
        <TextInput placeholder={this.props.task.title}
                   onChangeText={this.onChangeText}
                   underlineColorAndroid={colors.text}
                   placeholderTextColor={colors.text}
                   autoCapitalize={'sentences'}
                   style={{marginBottom: 12}}/>

        <Text style={styles.formLabel}>Description</Text>
        <TextInput defaultValue={this.props.task.description}
                   multiline={true}
                   onChangeText={this.onChangeDescription}
                   underlineColorAndroid={colors.text}
                   placeholderTextColor={colors.text}
                   autoCapitalize={'sentences'}
                   style={{marginBottom: 12, flex: 2, textAlignVertical: 'top'}}/>

        {this.renderDateTimePicker()}

        <Button title="Done"
                large
                onPress={this.finished}
                backgroundColor={colors.priority4}
                buttonStyle={{marginTop: 20, marginLeft: 0, marginRight: 0}}/>
      </View>
    )
  }
}