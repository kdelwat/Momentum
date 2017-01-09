/* The edit task scene */

import React, {Component} from 'react'
import {View, StyleSheet, TextInput, ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
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
  };

  // When finished editing, create a new task and call the callback function with the task id
  // and the new task
  finished = () => {
    const oldTask = this.props.task;
    const newTask = {
      title: this.state.title,
      description: this.state.description,
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
  onChangeDescription = (description) => this.setState({description: description});
  onChangeDeadline = (date) => this.setState({deadline: date});
  onChangeActive = (date) => this.setState({active: date});
  setActiveToDeadline = () => this.setState({active: this.state.deadline});

  render() {
    return (
      <View style={[styles.container, styles.formContainer]}>

        <TitleBar title={this.props.sceneTitle} />

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
                  raised
                  onPress={this.setActiveToDeadline}
                  backgroundColor={colors.main}
                  buttonStyle={styles.formButton}
          icon={{name: 'arrow-upward'}}/>
        </View>

        <Button title="Done"
                raised
                large
                onPress={this.finished}
                backgroundColor={colors.priority4}
                buttonStyle={{marginTop: 20, marginLeft: 0, marginRight: 0}}/>
      </View>
    )
  }
}