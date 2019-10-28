import React, {Component} from 'react';

import {setIsRinging, setAlarmID} from '../actions/isRinging';
import Home from './Home';
import Alarm from './Alarm';
import {connect} from 'react-redux';
import RNRestart from 'react-native-restart';

class Root extends Component {
  constructor(props) {
    super(props);
    const _isRinging = this.props.alarmID;
    if (_isRinging) {
      if (!this.props.isRinging.alarmID) {
        this.props.setAlarmID(this.props.alarmID);

        this.props.setIsRinging(true);
        //実機でバグがありそう
        // RNRestart.Restart();
      } else {
        this.props.setIsRinging(true);
      }
    }
  }

  render() {
    if (this.props.isRinging.alarmID) {
      return <Alarm alarmID={this.props.isRinging.alarmID} />;
    } else {
      return <Home />;
    }
  }
}

const mapStateToProps = state => {
  return {
    isRinging: state.isRinging,
  };
};

export default connect(
  mapStateToProps,
  {
    setIsRinging,
    setAlarmID,
  },
)(Root);
