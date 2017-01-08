/* The edit task scene */

import React, {Component} from 'react'
import {View, TextInput} from 'react-native'
import {FormInput} from 'react-native-elements'

export default class EditScene extends Component {

  state = {
    title: '',
  };

  finished = () => {
    this.props.callback(this.props.taskID, this.state.title);
    this._return();
  };

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