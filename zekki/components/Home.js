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
      <View>
        <Button title="add" onPress={() => Actions.addAlarm()} />
        <Button title="setting" onPress={() => Actions.setting()} />
        <Text>Home</Text>
        {this.state.alarms.map(e => {
          return <AlarmInfo times={e.time} days={e.days} />;
        })}
        {/* <AlarmInfo times={2345} days={['asd', 'asds']} />
        <AlarmInfo times={2345} days={['asd', 'asds']} /> */}
      </View>
    );
  }
}
