import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AlarmInfo from './AlarmInfo';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [
        {time: 2345, days: [false, false, true, true, true, true, false]},
        {time: 1233, days: [false, false, true, true, true, true, false]},
      ],
    };
    console.log(this.state.alarms);
  }

  render() {
    return (
      <View　style={{position: 'absolute', height: 50, width: 60, right: 0, bottom: 0}}>
          <Button title="add" onPress={() => Actions.addAlarm()} 
          />
      </View>
    );
  }
}
