/*The main scene of the app: a list of tasks*/
import React, {Component} from 'react'
import {View, StyleSheet, AsyncStorage} from 'react-native'
import {Button, Icon, ButtonGroup, Text, List, ListItem} from 'react-native-elements'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import moment from 'moment'
import 'moment/locale/en-au'

const COLORS = {
  priority1: 'red',
  priority2: 'orange',
  priority3: 'green'
};

const STORAGE_KEY = 'com.cadelwatson.android.tasks.state'
const NOW = moment();

// Get the days remaining until a Moment
function daysRemaining(futureMoment) {
  return futureMoment.diff(NOW, 'days')
};

// Comparative function for tasks which sorts by days remaining until deadline
function compareTasks(a, b) {
  const daysUntilA = daysRemaining(a.deadline);
  const daysUntilB = daysRemaining(b.deadline);

  if (daysUntilA === daysUntilB) {
    return 0;
  }

  return daysUntilA > daysUntilB ? 1 : -1;
}

export default class MainScene extends Component {

  state = {tasks: [
    {
      title: 'Do this upcoming thing',
      id: 123,
      completed: false,
      active: moment('2017-01-09 09:30'),
      deadline: moment('2017-01-09 17:00'),
    },
    {
      title: 'Do this active thing',
      id: 125,
      completed: false,
      active: moment('2017-01-06 09:30'),
      deadline: moment('2017-02-22 10:20'),
    },
    {
      title: 'Do this other active thing',
      id: 128,
      completed: false,
      active: moment('2017-01-06 09:30'),
      deadline: moment('2017-01-10 10:20'),
    },
    {
      title: 'Do this completed thing',
      id: 127,
      completed: true,
      active: moment('2017-02-13 09:30'),
      deadline: moment('2017-02-18 10:20'),
    },
  ]};

  componentWillMount() {
    this.flushStorage(); // Temporary during development
    this.load();
  }

  // Remove the stored state
  flushStorage = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  // Load the task list from AsyncStorage
  load = async () => {
    try {
      const loadedStateString = await AsyncStorage.getItem(STORAGE_KEY);

      // If there is no save data, exit early
      if (loadedStateString === null) {
        return;
      }

      // Parse the loaded string, converting timestamps to Moments
      const loadedTasks = JSON.parse(loadedStateString).tasks.map(x => {
        x.active = moment(x.active);
        x.deadline = moment(x.deadline);
        return x;
      });

      // Set the new state to the loaded tasks
      this.setState({tasks: loadedTasks})

    } catch (exception) {
      console.error("Couldn't load past state");
    }
  };

  // Save the current state in AsyncStorage
  save = async () => {
    try {
      console.log(this.state.tasks)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (exception) {
      console.error("Couldn't save current state")
    }
  };

  // Assign a task one of three statuses: 0 - upcoming, 1 - active, 2 - completed
  getTaskStatus = (task) => {
    if (task.completed) {
      return 2;
    } else if (moment().diff(task.active) >= 0) {
      return 1;
    } else {
      return 0;
    }
  };

  // Open the EditScene to create a new task
  addTask = () => {
    let {tasks} = this.state;
    // The new ID is the highest current ID plus one
    const newID = Math.max(...tasks.map(x => x.id)) + 1;
    // Create a blank task which will be 'edited': essentially the same as creating a new one!
    const blankTask = {
      title: '',
      id: newID,
      completed: false,
      active: moment(),
      deadline: moment(),
    };
    this.props.navigator.push({
      id: 'Edit',
      task: blankTask,
      callback: this.appendNewTask,
    })

  };

  // Append a task to the current tasks state
  appendNewTask = (id, newTask) => {
    let {tasks} = this.state;
    tasks.push(newTask);
    this.setState({tasks});
  };

  // Replaces the task given by ID with the new task
  replaceTask = (id, newTask) => {
    let {tasks} = this.state;
    // Find the task with the right ID
    const index = tasks.findIndex(x => x.id === id);
    // Replace with the new task
    tasks[index] = newTask;
    // Set the new state
    this.setState({tasks});
    this.save();
  };

  // Open the edit screen for the given list item
  editListItem = (id) => {
    const {tasks} = this.state;
    const task = tasks.find(x => x.id === id);
    this.props.navigator.push({
      id: 'Edit',
      task: task,
      callback: this.replaceTask,
    })
  };

  // Promote the given list item from Upcoming/Active -> Completed
  completeListItem = (id) => {
    let {tasks} = this.state;
    // Find the task with the right ID
    const index = tasks.findIndex(x => x.id === id);
    // Set its state to completed
    tasks[index].completed = true;
    // Set the new state
    this.setState({tasks});
    this.save();
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
              tasks.filter(x => this.getTaskStatus(x) === 2)
                .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
          <List tabLabel={'Active'}>
            {
              tasks.filter(x => this.getTaskStatus(x) === 1)
                .sort(compareTasks)
                .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
          <List tabLabel={'Upcoming'}>
            {
              tasks.filter(x => this.getTaskStatus(x) === 0)
                .sort(compareTasks)
                .map((listItem, index) => this.renderListItem(listItem, index))
            }
          </List>
        </ScrollableTabView>

        <View style={styles.horizontal}>
          <Icon
            name={'note-add'}
            reverse
            color='#f50'
            onPress={this.addTask}/>
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