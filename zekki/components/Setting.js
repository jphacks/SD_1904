import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';

export default class Setting extends Component {
  render() {
    return (
      <View>
        <Button title="NFC" onPress={() => Actions.nfc()} />
        <Button
          title="デフォルト設定"
          onPress={() => Actions.addAlarm({isDefault: true})}
        />
        <Button title="アラーム音の追加" onPress={() => this.pickaudio()} />
        <Button title="ライセンス" />
      </View>
    );
  }

  async pickaudio() {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });
  }
}
