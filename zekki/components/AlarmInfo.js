import React, {Component} from 'react';
import {Text, View, ListView, FlatList, Switch} from 'react-native';
import {addActiveAlarm, removeActiveAlarm} from '../actions/activeAlarms';
import {replaceAlarm} from '../actions/alarms';
import {connect} from 'react-redux';
import Launcher from 'react-native-app-launcher';
import {ListItem, CheckBox} from 'react-native-elements';

class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.youbilist = ['月', '火', '水', '木', '金', '土', '日'];
    this.state = {
      isActive: this.props.info.isActive,
    };
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
        {/*<View>
          <Text>
            {this.props.info.hour}:
            {minutes[0].substring(minutes[0].length - 2, minutes[0].length)}
          </Text>
        </View>*/}

        <View style={{flex: 1}}>
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
                this.setState({isActive: !this.state.isActive});
                if (this.state.isActive) {
                  this.props.addActiveAlarm(this.props.index);
                  const alarmInfo = this.props.info;
                  alarmInfo.isActive = false;
                  this.props.replaceAlarm(this.props.index, alarmInfo);

                  // remove alarm
                  Launcher.clearAlarm(this.props.index);
                } else {
                  this.props.removeActiveAlarm(
                    this.props.activeAlarms.indexOf(this.props.index),
                  );
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
                      dd = nd;
                      break;
                    }
                  }

                  if (_hour > alarmInfo.hour && _minutes > alarmInfo.minutes) {
                    date.setDate(date.getDate() + 1);
                  }
                  date.setDate(date.getDate() + dd);
                  date.setHours(alarmInfo.hour);
                  date.setMinutes(alarmInfo.minutes);

                  // setalarm
                  Launcher.setAlarm(this.props.index, date.getTime(), false);
                }
              },
              value: this.state.isActive,
            }}
            bottomDivider
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeAlarms: state.activeAlarms,
  };
};

export default connect(
  mapStateToProps,
  {
    addActiveAlarm,
    removeActiveAlarm,
    replaceAlarm,
  },
)(AlarmInfo);
