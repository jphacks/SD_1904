import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button
          title="add"
          onPress={() => Actions.addAlarm({isDefault: false})}
        />
        <Button title="setting" onPress={() => Actions.setting()} />
        <Text>Home</Text>
      </View>
    );
  }
}
