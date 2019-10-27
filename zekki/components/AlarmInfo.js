import React, {Component} from 'react';
import {Text, View, ListView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.youbilist = ['月', '火', '水', '木', '金', '土', '日'];
  }

  render() {
    const youbis = [];
    const minutes = [];
    const kugi = [':'];
    let youma = '';
    minutes.push('0' + this.props.info.minute);
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
            bottomDivider
          />
        </View>
      </View>
    );
  }
}
