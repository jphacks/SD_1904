import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AlarmInfo from './AlarmInfo';
import { Icon, Avatar} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [
        {
          hour: 8,
          minute: 45,
          days: [true, false, true, true, true, true, false],
        },
        {
          hour: 15,
          minute: 8,
          days: [false, false, true, true, false, true, false],
        },
        {
          hour: 24,
          minute: 8,
          days: [true, false, true, true, false, true, false],
        },
      ],
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Avatar
          size={100}
          rounded
          overlayContainerStyle={{backgroundColor: 'white'}}
          icon={{              
            name:'add-circle-outline',
            color:"blue",
            size:100,
          }}
          containerStyle={{position:"absolute",right:"5%",bottom:"5%"}}
          onPress={() => Actions.addAlarm({isDefault: false})}
        />
        <Text>Home</Text>
        {this.state.alarms.map(e => {
          return <AlarmInfo info={e} />;
        })}
      </View>
    );
  }
}
