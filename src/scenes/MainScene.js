/*The main scene of the app: a list of tasks*/
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Button, Icon, ButtonGroup, Text, List, ListItem} from 'react-native-elements'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'


export default class MainScene extends Component {

  state = {tasks: [
    {
      title: 'Do this upcoming thing',
      id: 123,
      daysRemaining: 3,
      status: 0,
    },
    {
      title: 'Do this other upcoming thing',
      id: 124,
      daysRemaining: 5,
      status: 0,
    },
    {
      title: 'Do this active thing',
      id: 125,
      daysRemaining: 3,
      status: 1,
    },
    {
      title: 'Do this other active thing',
      id: 126,
      daysRemaining: 5,
      status: 1,
    },
    {
      title: 'Do this completed thing',
      id: 127,
      daysRemaining: 3,
      status: 2,
    },
    {
      title: 'Do this other completed thing',
      id: 128,
      daysRemaining: 22,
      status: 2,
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

  // Given a task object and index, return a ListItem
  renderListItem(listItem, index) {
    return (<ListItem
      key={index}
      title={listItem.title}
      hideChevron={true}
      subtitle={'test'}
      badge={{value: listItem.daysRemaining}}
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