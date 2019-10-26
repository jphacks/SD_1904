import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

import AlarmInfo from './AlarmInfo';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [
        {
          hour: 8,
          minute: 45,
          days: [true, false, true, true, true, true, false],
        },
        {
          hour: 15,
          minute: 8,
          days: [false, false, true, true, false, true, false],
        },
        {
          hour: 24,
          minute: 8,
          days: [true, false, true, true, false, true, false],
        },
      ],
    };
    console.log(this.state.alarms);
  }

  render() {
    return (
      <View>
        <Button title="add" onPress={() => Actions.addAlarm()} />
        <Button title="setting" onPress={() => Actions.setting()} />
        <Text>Home</Text>
        {this.state.alarms.map(e => {
          return <AlarmInfo info={e} />;
        })}
        {/* <AlarmInfo times={2345} days={['asd', 'asds']} />
        <AlarmInfo times={2345} days={['asd', 'asds']} /> */}
      </View>
    );
  }
}
