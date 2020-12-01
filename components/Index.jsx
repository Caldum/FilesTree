import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../redux/actions';

export function Index ({ getData, data }) {
  const [URL, onChangeURL] = useState('');

  const handleRequest = () => {
    console.log('holu');
    getData(URL);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.title}>FilesTree Visualizer</Text>
      </View>
      <View>
        <Text style={styles.label}>Data URL:</Text>
        <TextInput style={styles.input} autoCapitalize="none" value={URL} onChangeText={text => onChangeURL(text)} placeholder="https://ejemplo.com/api" />
        <Button onPress={() => handleRequest()} title="Realizar consulta" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 35,
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    width: '100%',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1
  }
});

function mapStateToProps (state) {
  return {
    data: state.visualizer.data
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getData: (url) => dispatch(getData(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
