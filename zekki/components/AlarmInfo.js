import React, {Component} from 'react';
import {Text, View, ListView, FlatList} from 'react-native';

export default class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.youbilist = ['月', '火', '水', '木', '金', '土', '日'];
  }

  render() {
    const youbis = [];
    for (const [i, day] of this.props.days) {
      if (day) {
        youbis.push(<Text>{this.youbilist[i]}</Text>);
      }
    }

    return (
      <View>
        {youbis.map(data => {
          return <Text key={data}>{data}</Text>;
        })}
      </View>
    );
  }
}
