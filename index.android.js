/*The index file simply contains the navigator, which delegates to individual scenes.*/

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import MainScene from './src/scenes/MainScene'

export default class Tasks extends Component {

  /*
   renderScene is called by the navigator when a route is pushed. The scene doing the pushing
   must provide a route ID to link to another scene.
   */
  renderScene(route, navigator) {
    switch(route.id) {
      case 'Main':
        return <MainScene navigator={navigator} />
    }
  };

  render() {
    return (
      <Navigator initialRoute={{id: 'Main'}} renderScene={this.renderScene} />
    );
  }
}

AppRegistry.registerComponent('Tasks', () => Tasks);
