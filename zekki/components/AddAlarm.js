import React, {Component} from 'react';
import {View} from 'react-native';
import {addAlarm, removeAlarm} from '../actions/alarms';
import {setDefaultAlarm} from '../actions/defaultAlarm';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Actions} from 'react-native-router-flux';
import {Button, Avatar, Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

class AddAlarm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      alarmInfo: {...this.props.defaultAlarm},
      date: new Date(),
    };
  }

  setText(text, property) {
    const state = {...this.state};
    state.alarmInfo[property] = text;
    this.setState(state);
  }

  setDate = (event, date) => {
    // date.setTime(date.getTime() + 1000*60*60*9);
    const alarmInfoState = {...this.state.alarmInfo};
    alarmInfoState.hour = date.getHours();
    alarmInfoState.minutes = date.getMinutes();
    this.setState({
      show: false,
      alarmInfo: alarmInfoState,
    });
  };

  timepicker = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    const days = ['月', '火', '水', '木', '金', '土', '日'];
    const show = this.state.show;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Button
            titleStyle={{fontSize: 110}}
            icon={<Icon name="alarm" size={110} color="white" />}
            buttonStyle={{width: '100%', height: '100%'}}
            title={
              this.state.alarmInfo.hour.toString() +
              ':' +
              (0 + this.state.alarmInfo.minutes.toString()).slice(-2)
            }
            onPress={() => {
              this.timepicker();
            }}
          />

          {show && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={this.setDate}
            />
          )}
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.state.alarmInfo.days.map((e, i) => {
            return (
              <Avatar
                rounded
                title={days[i]}
                onPress={() => {
                  const state = {...this.state};
                  state.alarmInfo.days[i] = !state.alarmInfo.days[i];
                  this.setState(state);
                }}
                key={i}
                size="medium"
                overlayContainerStyle={
                  e ? {backgroundColor: 'white'} : {backgroundColor: 'gray'}
                }
                titleStyle={{color: 'black'}}
                containerStyle={{margin: 2, alignSelf: 'center'}}
              />
            );
          })}
        </View>
        <View style={{flex: 1}}>
          <Button
            icon={<Icon name="queue-music" size={30} color="blue" />}
            title={this.state.alarmInfo.soundName}
            type="clear"
            onPress={() => this.pickaudio()}
            titleStyle={{fontSize: 30}}
          />
        </View>
        <Button
          title="ok"
          onPress={() => {
            if (this.props.isDefault) {
              this.props.setDefaultAlarm(this.state.alarmInfo);
            } else {
              this.props.addAlarm(this.state.alarmInfo);
            }
            Actions.pop();
          }}
        />
      </View>
    );
  }

  async pickaudio() {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });

    const state = {...this.state};
    state.alarmInfo.soundName = res.name;
    state.alarmInfo.sound = res.uri;
    this.setState(state);
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
