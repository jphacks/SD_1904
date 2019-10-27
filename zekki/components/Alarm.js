import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {setIsRinging, setAlarmID} from '../actions/isRinging';
import {removeActiveAlarm} from '../actions/activeAlarms';
import {replaceAlarm} from '../actions/alarms';

import TrackPlayer from 'react-native-track-player';
import SystemSetting from 'react-native-system-setting';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

var music = {
  id: 'unique track id', // Must be a string, required
  url: 'https://soundeffect-lab.info/sound/anime/mp3/trumpet1.mp3', // Load media from the network
};

class Alarm extends Component {
  constructor(props) {
    super(props);
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add([music])
        .then(function() {
          SystemSetting.setVolume(1.0);
          TrackPlayer.play();
        })
        .catch(err => {
          console.error(err);
        });
      const volumeListener = SystemSetting.addVolumeListener(data => {
        // SystemSetting.setVolume(1.0);
      });

      TrackPlayer.addEventListener(
        'playback-queue-ended',
        (track, position) => {
          TrackPlayer.add([music]);
        },
      );
    });

    (async () => {
      try {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          NfcManager.unregisterTagEvent().catch(() => 0);
          if (this.props.nfcs.includes(tag.id)) {
            TrackPlayer.stop();
            this.props.removeActiveAlarm(
              this.props.activeAlarms.indexOf(this.props.alarmID),
            );
            const alarmInfo = this.props.alarms[this.props.alarmID];
            alarmInfo.isActive = false;
            this.props.replaceAlarm(this.props.alarmID, alarmInfo);

            this.props.setIsRinging(false);
            this.props.setAlarmID(null);
          } else {
            (async () => {
              await NfcManager.registerTagEvent();
            })();
          }
        });
        await NfcManager.registerTagEvent();
      } catch (ex) {
        NfcManager.unregisterTagEvent();
      }
    })();
  }
  render() {
    return (
      <View style={{flex: 4}}>
        <Text h4 style={{top: 50, textAlign: 'center', color: 'gray'}}>
          NFCをタッチしてください
        </Text>
        <Icon name="nfc" size={400} containerStyle={{opacity: 0.1, top: 50}} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isRinging: state.isRinging,
    nfcs: state.nfcs,
    alarms: state.alarms,
    activeAlarms: state.activeAlarms,
  };
};

export default connect(
  mapStateToProps,
  {
    setIsRinging,
    setAlarmID,
    removeActiveAlarm,
    replaceAlarm,
  },
)(Alarm);
