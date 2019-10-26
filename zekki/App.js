import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from './components/Home';
import AddAlarm from './components/AddAlarm';
import Setting from './components/Setting';
import Nfc from './components/Nfc';
import Alarm from './components/Alarm';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" initial component={Home} />
          <Scene key="addAlarm" component={AddAlarm} />
          <Scene key="setting" component={Setting} />
          <Scene key="nfc" component={Nfc} />
          <Scene key="alarm" component={Alarm} />
        </Scene>
      </Router>
    );
  }
}
