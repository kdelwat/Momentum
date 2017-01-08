/*The main scene of the app: a list of tasks*/
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Button, Icon, ButtonGroup, Text, List, ListItem} from 'react-native-elements'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import moment from 'moment'
import 'moment/locale/en-au'

const COLORS = {
  priority1: 'red',
  priority2: 'orange',
  priority3: 'green'
};

const NOW = moment();

// Get the days remaining until a Moment
function daysRemaining(futureMoment) {
  return futureMoment.diff(NOW, 'days')
};

export default class MainScene extends Component {

  state = {tasks: [
    {
      title: 'Do this upcoming thing',
      id: 123,
      status: 0,
      active: moment('2017-01-08 09:30'),
      deadline: moment('2017-01-09 10:20'),
    },
    {
      title: 'Do this active thing',
      id: 125,
      status: 1,
      active: moment('2017-01-19 09:30'),
      deadline: moment('2017-02-22 10:20'),
    },
    {
      title: 'Do this completed thing',
      id: 127,
      status: 2,
      active: moment('2017-02-13 09:30'),
      deadline: moment('2017-02-18 10:20'),
    },
  ]};

  // Open the edit screen for the given list item
  editListItem = (id) => {
  };

  // Promote the given list item from Upcoming/Active -> Completed
  completeListItem = (id) => {
    let {tasks} = this.state;
    // Find the task with the right ID
    const index = tasks.findIndex(x => x.id === id);
    // Set its state to completed
    tasks[index].status = 2;
    // Set the new state
    this.setState({tasks});
  };

  // Return a color dependent on the urgency of the task, based on days remaining
  priorityColor(daysRemaining) {
    if (daysRemaining <= 1) {
      return COLORS.priority1;
    } else if (daysRemaining > 7) {
      return COLORS.priority3;
    } else {
      return COLORS.priority2;
    }
  }

  // Given a task object and index, return a ListItem
  renderListItem(listItem, index) {
    return (<ListItem
      key={index}
      title={listItem.title}
      hideChevron={true}
      subtitle={listItem.deadline.format()}
      badge={{value: daysRemaining(listItem.deadline),
              badgeContainerStyle: {backgroundColor: this.priorityColor(daysRemaining(listItem.deadline))}}}
      // The onPress function will call listItemPressed with the item's ID.
      onPress={() => this.editListItem(listItem.id)}
      onLongPress={() => this.completeListItem(listItem.id)}
    />)
  }

  render() {
    const {tasks} = this.state;
    return (
      <View style={styles.container}>

        <ScrollableTabView renderTabBar={() => <DefaultTabBar />}
                           prerenderingSiblingsNumber={Infinity}
                           initialPage={1}
        >
          <List tabLabel={'Completed'}>
            {
              tasks.filter(x => x.status === 2)
                .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
          <List tabLabel={'Active'}>
            {
              tasks.filter(x => x.status === 1)
                   .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
          <List tabLabel={'Upcoming'}>
            {
              tasks.filter(x => x.status === 0)
                .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
        </ScrollableTabView>

        <View style={styles.horizontal}>
          <Icon
            name={'note-add'}
            reverse
            color='#f50'/>
        </View>
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