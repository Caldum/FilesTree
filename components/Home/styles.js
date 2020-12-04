import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#3e6a80'
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    color: 'white'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white'
  },
  input: {
    width: '100%',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    color: '#3e6a80',
    marginBottom: 5
  },
  inputViewer: {
    width: '100%',
    fontSize: 18,
    padding: 5,
    backgroundColor: 'white',
    color: '#3e6a80',
    marginBottom: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fab469',
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  error: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
});

export default styles;
