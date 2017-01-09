import {StyleSheet} from 'react-native'

export const colors = {
  main: '#493843',
  text: 'black',
  priority1: '#D45113',
  priority2: '#F9A03F',
  priority3: '#F8DDA4'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleBar: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: colors.text,
  },
  listContainerStyle: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});