/*The main scene of the app: a list of tasks*/
import React, {Component} from 'react'
import {Button} from 'react-native-elements'

export default class MainScene extends Component {

  filters = [
    {name: 'Active', id: 0},
    {name: 'Upcoming', id: 1},
    {name: 'Completed', id: 2},
  ];

  render() {
    return (
      <Button
        raised
        icon={{name: 'cached'}}
        title='RAISED WITH ICON' />
    )
  }
}