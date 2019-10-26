import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {addAlarm, removeAlarm} from '../actions/alarms';
import {setDefaultAlarm} from '../actions/defaultAlarm';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Actions} from 'react-native-router-flux';

class AddAlarm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      alarmInfo: {...this.props.defaultAlarm},
    };
  }

  setText(text, property) {
    const state = {...this.state};
    state.alarmInfo[property] = text;
    this.setState(state);
  }

  render() {
    const days = ['月', '火', '水', '木', '金', '土', '日'];
    return (
      <View>
        {/* <Button title="button" onPress={() => this.showDatePicker()} /> */}
        <View style={{flexDirection: 'row'}}>
          <Text h1>{this.state.alarmInfo.hour}</Text>
          <Text h1>:</Text>
          <Text h1>{this.state.alarmInfo.minutes}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.state.alarmInfo.days.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={e ? styles.active : styles.inactive}>
                <Text>{days[i]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <TextInput
            value={this.state.alarmInfo.soundName}
            onChangeText={text => {
              this.setText(text, 'soundName');
            }}
          />
        </View>
        <View>
          <TextInput
            value={this.state.alarmInfo.tweet}
            onChangeText={text => {
              this.setText(text, 'tweet');
            }}
          />
        </View>
        <View>
          <TextInput
            value={this.state.alarmInfo.difficulty}
            onChangeText={text => {
              this.setText(text, 'difficulty');
            }}
            keyboardType="decimal-pad"
          />
        </View>

        {/* <Button
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
        <Button
          title="set"
          onPress={() => {
            this.props.setDefaultAlarm({
              hour: 10,
              minutes: 10,
              days: [false, false, true, false, false, true, false],
              sound: 'content://',
              soundName: 'test',
              tweet: 'twiiter',
              difficulty: 0,
            });
          }}
        />
 */}
        <Button
          title="ok"
          onPress={() => {
            if (this.props.isDefault) {
              this.props.setDefaultAlarm(this.state.alarmInfo);
            } else {
              this.props.addAlarm();
            }
            Actions.pop();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms,
    defaultAlarm: state.defaultAlarm,
  };
};

export default connect(
  mapStateToProps,
  {
    addAlarm,
    removeAlarm,
    setDefaultAlarm,
  },
)(AddAlarm);

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'black',
  },
  inactive: {
    backgroundColor: 'gray',
  },
});
