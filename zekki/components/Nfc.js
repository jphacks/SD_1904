import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';
import {typeAlias} from '@babel/types';

import Icon from 'react-native-vector-icons/FontAwesome';
import {ButtonGroup, Avatar} from 'react-native-elements';

class Nfc extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    super();
    this.state = {
      selectedIndex: 2,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
    console.log(selectedIndex);
  }
  render() {
    const buttons = ['Hello', 'World', 'Buttons'];
    const {selectedIndex} = this.state;
    // const {Avatar} = '<Text>dffe</Text>';

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 4}}>
          {/* <Avatar rounded title="NFC" size="large" /> */}
          {(() => {
            if (this.uselectIndex == '0') {
              return <Text>dkmd</Text>;
            } else {
              return <Text>dddddd</Text>;
            }
          })()}
        </View>

        <View style={{flex: 1, margin: 0}}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: '100%',
              width: '100%',
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
            }}
          />
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
    fontSize: 30,
    textAlign: 'center',
  },
});
