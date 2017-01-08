import {StyleSheet} from 'react-native'

export const colors = {
  priority1: 'red',
  priority2: 'orange',
  priority3: 'green'
};

export const styles = StyleSheet.create({
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