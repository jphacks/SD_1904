import React, {Component} from 'react';

import {setIsRinging} from '../actions/isRinging';
import Home from './Home';
import Alarm from './Alarm';
import {connect} from 'react-redux';
import RNRestart from 'react-native-restart';

class Root extends Component {
  constructor(props) {
    super(props);
    const _isRinging = this.props.alarmID;
    if (_isRinging) {
      if (!this.props.isRinging) {
        RNRestart.Restart();
      }
      this.props.setIsRinging(true);
    } else {
      this.props.setIsRinging(false);
    }
  }

  render() {
    if (this.props.isRinging) {
      return <Alarm alarmID={this.props.alarmID} />;
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
  },
)(Root);
