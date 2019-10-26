import React, {Component} from 'react';
import {Text, View, ListView, FlatList} from 'react-native';

export default class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.youbilist = ['月', '火', '水', '木', '金', '土', '日'];
  }

  render() {
    const youbis = [];
    const minutes = [];
    minutes.push('0' + this.props.info.minute);
    this.props.info.days.map((data, i) => {
      if (data) {
        youbis.push(<Text>{this.youbilist[i]}</Text>);
      }
    });

    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text>
            {this.props.info.hour}:
            {minutes[0].substring(minutes[0].length - 2, minutes[0].length)}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {youbis.map((data, i) => {
            return <Text>{youbis[i]}</Text>;
          })}
        </View>
      </View>
    );
  }
}
