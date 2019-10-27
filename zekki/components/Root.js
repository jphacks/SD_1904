import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

import {setIsRinging} from '../actions/isRinging';
import Home from './Home';
import Alarm from './Alarm';
import {connect} from 'react-redux';

class Root extends Component {
  constructor(props) {
    super(props);
    if (this.props._isRinging) {
      this.props.setIsRinging(true);
    }
    if (!this.props._isRinging) {
      this.props.setIsRinging(false);
    }
  }

  render() {
    if (this.props.isRinging) {
      return <Alarm />;
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
