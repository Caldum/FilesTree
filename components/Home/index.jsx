import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../redux/actions';
import ItemList from './ItemList';
import styles from './styles';

export function Home ({ getData, data }) {
  const [state, setState] = useState({
    url: '',
    displayedItems: {},
    loading: false
  });

  const handleRequest = () => {
    setState({
      ...state,
      loading: true
    });
    getData(state.url);
  };

  useEffect(() => {
    data.length && setState({
      ...state,
      loading: false
    });
  }, [data]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={styles.title}>FilesTree Visualizer</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.label}>URL datos:</Text>
        <TextInput style={styles.input} autoCapitalize="none" value={state.url} onChangeText={text => setState({ ...state, url: text })} placeholder="https://ejemplo.com/api" />
        <TouchableOpacity style={styles.button} onPress={() => handleRequest()}>
          <Text style={styles.buttonText}>Realizar Consulta</Text>
        </TouchableOpacity>
      </View>
      {state.loading
        ? <ActivityIndicator animating={state.loading} size="large" color="white" />
        : <ScrollView>
          <ItemList items={data} />
        </ScrollView>}
    </View>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
