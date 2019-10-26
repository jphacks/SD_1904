import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {addAlarm, removeAlarm} from '../actions/alarms';
import {connect} from 'react-redux';

class AddAlarm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>AddAlarm</Text>
        <Button
          title="add"
          onPress={() => {
            this.props.addAlarm({a: 1});
          }}
        />
        <Button
          title="remove"
          onPress={() => {
            this.props.removeAlarm(this.props.alarms.length - 1);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms,
  };
};

export default connect(
  mapStateToProps,
  {
    addAlarm,
    removeAlarm,
  },
)(AddAlarm);
