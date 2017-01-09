import {StyleSheet} from 'react-native'

export const colors = {
  main: '#493843',
  priority1: '#D45113',
  priority2: '#F9A03F',
  priority3: '#F8DDA4'
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