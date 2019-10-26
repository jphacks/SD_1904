import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';
import { typeAlias } from '@babel/types';

class Nfc extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text>Nfc</Text>

        <View style={{flex:4,backgroundColor:"green"}}>
          <Text>deded</Text>
        </View>

        <View style={{flex:1,flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => {this.props.addNfc('a');}}>
            <Text style={styles.text}>add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {this.props.removeNfc(this.props.nfcs.length - 1);}}>
            <Text style={styles.text}>remove</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {this.props.removeNfc(this.props.nfcs.length - 1);}}>
            <Text style={styles.text}>other</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    nfcs: state.nfcs,
  };
};

export default connect(
  mapStateToProps,
  {
    addNfc,
    removeNfc,
  },
)(Nfc);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  button: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  text: {
    fontSize:30,
    textAlign: 'center',
  }
});