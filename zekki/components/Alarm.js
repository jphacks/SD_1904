import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
} from 'react-native';

import TrackPlayer from 'react-native-track-player';

import TrackPlayerEventTypes from 'react-native-track-player';

var music = {
  id: 'unique track id', // Must be a string, required
  
  url: require('./trumpet1.mp3'), // Load media from the network

};


TrackPlayer.setupPlayer().then(() => {
  TrackPlayer.addEventListener('playback-queue-ended', (track, position) => {
    TrackPlayer.add([music])
  });
  // The player is ready to be used
});


TrackPlayer.add([music]).then(function() {
  // The tracks were added
});



export default class Alarm extends Component {
  render() {
    return (
      <View>
        <Button
          title="Start button"
          onPress={() => {
            TrackPlayer.setVolume(1)
            TrackPlayer.play()
          }}
        />
        <Button
          title="Stop button"
          onPress={() => {
            TrackPlayer.stop()
          }}
        />   
        <Button
          title="State button"
          onPress={() => {TrackPlayer.getState().then(state => {
            console.log(state)
            // console.log("event", playback-queue-ended)
          });
          }}
        />  
        

        <Text>Alarm</Text>
      </View>
    );
  }
}