/* The edit task scene */

import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {FormLabel, FormInput, Text, Button} from 'react-native-elements'

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
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <Text h1>Edit task</Text>
        </View>
        <FormLabel>Title</FormLabel>
        <FormInput placeholder={this.props.task.title}
                   onChangeText={this.onChangeText}/>
        <Button title="Done"
                raised
                onPress={this.finished}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});