import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import SystemSetting from 'react-native-system-setting'
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import TrackPlayerEventTypes from 'react-native-track-player';

var music = {
  id: 'unique track id', // Must be a string, required
  url: require('./trumpet1.mp3'), // Load media from the network
};
export default class Alarm extends Component {
  constructor(props){
    super(props);
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add([music]).then(function() {
        // SystemSetting.setVolume(1.0);
        TrackPlayer.play();
      });
    
      const volumeListener = SystemSetting.addVolumeListener((data) => {
        // SystemSetting.setVolume(1.0);
      });
    
      TrackPlayer.addEventListener('playback-queue-ended', (track, position) => {
        TrackPlayer.add([music]);
      });
      // The player is ready to be used
    });

    (async () => {
      try {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          NfcManager.unregisterTagEvent().catch(() => 0);
          console.warn('NFC read');
          TrackPlayer.stop();
        });
        await NfcManager.registerTagEvent();
      } catch (ex) {
          console.warn('ex', ex);
          NfcManager.unregisterTagEvent();
    }})();

  }
  render() {
    return (
      <View>
        {/* <Button
          title="Stop button"
          onPress={() => {
            TrackPlayer.stop();
          }}
        />    */}

        <Text>NFCをかざしてください</Text>

        {/* <Button 
          title="State button"
          onPress={() => {TrackPlayer.getState().then(state => {
            console.log(state)
            // console.log("event", playback-queue-ended)
          });
          }}
        />  
       */}
      </View>
    );
  }
}
