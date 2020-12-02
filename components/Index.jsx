import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../redux/actions';
import { ListItem, Icon } from 'react-native-elements';

export function Index({ getData, data, dataError }) {
  const [URL, onChangeURL] = useState('');
  const [listItemVisibility, setListItemVisibility] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputVisibility, setInputVisibility] = useState(true);
  const [error, setError] = useState(false);

  const validateURL = (url) => {
    const urlRegEx = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
    return urlRegEx.test(url);
  };

  const handleRequest = () => {
    if (URL === '') {
      setError(true);
    } else {
      if (validateURL(URL)) {
        setLoading(true);
        getData(URL);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    if (data.length) {
      setInputVisibility(false);
    }
    setLoading(false);
  }, [data, dataError]);

  const handleVisibility = (item) => {
    if (!listItemVisibility) {
      setListItemVisibility({
        ...listItemVisibility,
        [item]: 'auto'
      });
    } else if (listItemVisibility && !listItemVisibility[item]) {
      setListItemVisibility({
        ...listItemVisibility,
        [item]: 'auto'
      });
    } else {
      setListItemVisibility({
        ...listItemVisibility,
        [item]: 0
      });
    }
  };

  const displayData = (data) => {
    return data.map(element => {
      if (element.files && element.files.length) {
        return (
          <React.Fragment key={'fragment-' + element.name}>
            <ListItem key={element.name} onPress={() => handleVisibility(element.name)} containerStyle={{ backgroundColor: '#3e6a80' }}>
              <Icon name="folder" color="#fab469" />
              <ListItem.Content>
                <ListItem.Title style={{ color: 'white' }}>{element.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <View style={{ paddingLeft: 20, height: listItemVisibility[element.name] ? listItemVisibility[element.name] : 0 }}>{displayData(element.files)}</View>
          </React.Fragment>
        );
      } else {
        return (
          <ListItem key={element.name} containerStyle={{ backgroundColor: '#3e6a80' }}>
            <Icon name={element.type === 'directory' ? 'folder' : 'description'} color="#fab469" />
            <ListItem.Content>
              <ListItem.Title style={{ color: 'white' }}>{element.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.title}>FilesTree Visualizer</Text>
      </View>
      {inputVisibility
        ? <View>
          <Text style={styles.label}>URL datos:</Text>
          <TextInput style={error ? { ...styles.input, borderWidth: 1, borderColor: 'red' } : styles.input} autoCapitalize="none" value={URL} onChangeText={text => onChangeURL(text)} placeholder="https://ejemplo.com/api" />
          <TouchableOpacity style={styles.button} onPress={() => handleRequest()}>
            <Text style={styles.buttonText}>Realizar Consulta</Text>
          </TouchableOpacity>
        </View>
        : <View>
          <Text style={styles.label}>Mostrando datos de:</Text>
          <Text style={styles.inputViewer}>{URL}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ ...styles.button, width: '49%' }} onPress={() => setInputVisibility(true)}>
              <Text style={styles.buttonText}>Cambiar URL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, width: '49%' }} onPress={() => handleRequest()}>
              <Text style={styles.buttonText}>Recargar</Text>
            </TouchableOpacity>
          </View>
        </View>}
      <ScrollView style={{ marginTop: 10 }}>
        {loading && <ActivityIndicator style={{ marginTop: 5 }} animating={loading} size="large" color="white" />}
        {data.length ? displayData(data) : dataError ? <Text style={styles.error}>{dataError}</Text> : null}
      </ScrollView>
    </View>
  );
}

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
    textAlign: "center",
    fontSize: 18,
    color: "white"
  }
});

function mapStateToProps(state) {
  return {
    data: state.visualizer.data,
    dataError: state.visualizer.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (url) => dispatch(getData(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
