import {StyleSheet} from 'react-native'

export const colors = {
  main: '#493843',
  text: '#43484D',
  priority1: '#D45113',
  priority2: '#F9A03F',
  priority3: '#F8DDA4'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  formLabel: {
    color: colors.text,
    fontSize: 16,
    paddingTop: 2,
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
  datepicker: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 3,
    paddingRight: 3,
  },
  dateInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.text,
    alignItems: 'flex-start',
  },
  textInput: {
    color: colors.text,
    fontSize: 14,
    paddingBottom: 4,
  },
  formButton: {
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 0,
    height: 30,
  },
});