import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Launcher from 'react-native-app-launcher';
import AlarmInfo from './AlarmInfo';
import {addActiveAlarm, removeActiveAlarm} from '../actions/activeAlarms';
import {connect} from 'react-redux';
import {setIsRinging} from '../actions/isRinging';

class Home extends Component {
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
  }

  render() {
    return (
      <View>
        <Button
          title="add"
          onPress={() => Actions.addAlarm({isDefault: false})}
        />
        <Button
          title="wakeup"
          onPress={() =>
            Launcher.setAlarm('0', new Date().getTime() + 10000, false)
          }
        />
        <Button title="setting" onPress={() => Actions.setting()} />
        <Text>Home</Text>
        {this.state.alarms.map(e => {
          return <AlarmInfo info={e} />;
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms,
    activeAlarms: state.activeAlarms,
    isRinging: state.isRinging,
  };
};

export default connect(
  mapStateToProps,
  {
    addActiveAlarm,
    removeActiveAlarm,
    setIsRinging,
  },
)(Home);
