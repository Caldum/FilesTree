import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Index () {
  const [URL, onChangeURL] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.title}>FilesTree Visualizer</Text>
      </View>
      <View>
        <Text style={styles.label}>URL de datos:</Text>
        <TextInput style={styles.input} autoCapitalize="none" value={URL} onChangeText={text => onChangeURL(text)} placeholder="https://ejemplo.com/api" />
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
