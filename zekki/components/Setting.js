import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Setting extends Component {
  render() {
    return (
      <View>
        <Button title="NFC" onPress={() => Actions.nfc()} />
        <Button title="デフォルト設定" onPress={() => Actions.addAlarm()} />
        <Button title="ライセンス" />
      </View>
    );
  }
}
