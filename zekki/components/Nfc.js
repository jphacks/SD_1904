import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';

class Nfc extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <View>
        <Text>Nfc</Text>
        <Button
          title="add"
          onPress={() => {
            this.props.addNfc('a');
          }}
        />
        <Button
          title="remove"
          onPress={() => {
            this.props.removeNfc(this.props.nfcs.length - 1);
          }}
        />
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
