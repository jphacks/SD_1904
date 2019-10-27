import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Launcher from 'react-native-app-launcher';
import AlarmInfo from './AlarmInfo';
import {addActiveAlarm, removeActiveAlarm} from '../actions/activeAlarms';
import {addAlarm, removeAlarm} from '../actions/alarms';
import {connect} from 'react-redux';
import {Icon, Avatar} from 'react-native-elements';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Avatar
          size={80}
          rounded
          overlayContainerStyle={{backgroundColor: 'transparent'}}
          icon={{              
            name:'add-circle-outline',
            color:"blue",
            size:80,
          }}

          containerStyle={{position: 'absolute', right: '5%', bottom: '5%'}}
          onPress={() => Actions.addAlarm({isDefault: false})}

        />
        <Button
          title="wakeup"
          onPress={() =>
            Launcher.setAlarm('0', new Date().getTime() + 10000, false)
          }
        />
        <Text>Home</Text>
        {this.props.alarms.map((e, i) => {
          return <AlarmInfo info={e} index={i} />;
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms,
  };
};

export default connect(
  mapStateToProps,
  {
    addAlarm,
    removeAlarm,
  },
)(Home);
