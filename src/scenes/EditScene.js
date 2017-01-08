/* The edit task scene */

import React, {Component} from 'react'
import {View, TextInput} from 'react-native'

export default class EditScene extends Component {

  state = {
    title: '',
  };

  // When finished editing, create a new task and call the callback function with the task id
  // and the new task
  finished = () => {
    const oldTask = this.props.task;
    const newTask = {
      title: this.state.title,
      id: oldTask.id,
      completed: oldTask.completed,
      active: oldTask.active,
      deadline: oldTask.deadline,
    };
    this.props.callback(this.props.task.id, newTask);
    this._return();
  };

  // Pop the EditScene off the navigation stack, returning to MainScene
  _return () {
    this.props.navigator.pop();
  }

  onChangeText = (title) => this.setState({title});

  render() {
    return (
      <View>
        <TextInput placeholder="New name"
                   onChangeText={this.onChangeText}
                   onSubmitEditing={this.finished} />
      </View>
    )
  }
}