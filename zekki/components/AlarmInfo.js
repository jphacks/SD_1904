import React, {Component} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import {addActiveAlarm, removeActiveAlarm} from '../actions/activeAlarms';
import {replaceAlarm, removeAlarm} from '../actions/alarms';
import {connect} from 'react-redux';
import Launcher from 'react-native-app-launcher';
import {ListItem} from 'react-native-elements';

class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.youbilist = ['月', '火', '水', '木', '金', '土', '日'];
  }

  removeAlarmInfo() {
    this.props.removeActiveAlarm(
      this.props.activeAlarms.indexOf(this.props.index),
    );

    this.props.removeAlarm(this.props.index, this.props.info);
    if (this.props.info.isActive) {
      Launcher.clearAlarm(this.props.index);
    }
  }

  render() {
    const youbis = [];
    const minutes = [];
    const kugi = [':'];
    let youma = '';
    minutes.push('0' + this.props.info.minutes);
    this.props.info.days.map((data, i) => {
      if (data) {
        youbis.push(this.youbilist[i]);
      }
    });

    for (const youbi of youbis) {
      youma += youbi;
    }

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          onPress={() => {
            Alert.alert(
              '削除しますか？',
              'いいえ',
              [
                {
                  text: 'OK',
                  onPress: () => this.removeAlarmInfo(),
                },
                {
                  text: 'キャンセル',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}
          style={{flex: 1}}>
          <ListItem
            title={
              this.props.info.hour +
              kugi[0] +
              minutes[0].substring(minutes[0].length - 2, minutes[0].length)
            }
            titleStyle={{fontSize: 30}}
            subtitle={youma}
            switch={{
              onChange: () => {
                if (this.props.info.isActive) {
                  this.props.removeActiveAlarm(
                    this.props.activeAlarms.indexOf(this.props.index),
                  );
                  const alarmInfo = this.props.info;
                  alarmInfo.isActive = false;
                  this.props.replaceAlarm(this.props.index, alarmInfo);

                  // remove alarm
                  Launcher.clearAlarm(this.props.index);
                } else {
                  this.props.addActiveAlarm(this.props.index);
                  const alarmInfo = this.props.info;
                  alarmInfo.isActive = true;
                  this.props.replaceAlarm(this.props.index, alarmInfo);

                  const date = new Date();
                  const _hour = date.getHours();
                  const _minutes = date.getMinutes();
                  const _day = date.getDay();
                  let dd = 0;
                  for (let i = 0; i < 7; i++) {
                    const nd = (i + _day) % 7;
                    if (alarmInfo.days[nd]) {
                      dd = i;
                      break;
                    }
                  }

                  if (
                    _hour * 60 + _minutes >
                    alarmInfo.hour * 60 + alarmInfo.minutes
                  ) {
                    //今日
                    if (dd === 0) dd++;
                  }
                  date.setDate(date.getDate() + dd);
                  date.setHours(alarmInfo.hour);
                  date.setMinutes(alarmInfo.minutes);
                  date.setSeconds(0);
                  date.setMilliseconds(0);
                  console.log(date);
                  // setalarm
                  Launcher.setAlarm(this.props.index, date.getTime(), false);
                }
              },
              value: this.props.info.isActive,
            }}
            bottomDivider
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeAlarms: state.activeAlarms,
    alarms: state.alarms,
  };
};

export default connect(
  mapStateToProps,
  {
    addActiveAlarm,
    removeActiveAlarm,
    replaceAlarm,
    removeAlarm,
  },
)(AlarmInfo);
