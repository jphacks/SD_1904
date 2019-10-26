import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

class Nfc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReading: false,
    };
    console.log(props);
  }

  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmout() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <View>
        <Text>Nfc</Text>
        <Button
          title="add"
          onPress={async () => {
            try {
              NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
                NfcManager.unregisterTagEvent().catch(() => 0);
                if (!this.props.nfcs.includes(tag.id)) {
                  console.warn(tag.id);
                  const index = this.props.nfcs.indexOf(tag.id);
                  this.props.addNfc(tag.id);
                }
                console.warn(this.props.nfcs);
                this.setState({isReading:false});
              });
              await NfcManager.registerTagEvent();
              this.setState({isReading:true});
            } catch (ex) {
              console.warn('ex', ex);
              NfcManager.unregisterTagEvent();
              this.setState({isReading:false});
            }
          }}
        />
        <Button
          title="remove"
          onPress={async () => {
            try {
              NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
                NfcManager.unregisterTagEvent().catch(() => 0);
                console.warn(tag.id);

                if (this.props.nfcs.includes(tag.id)) {
                  const index = this.props.nfcs.indexOf(tag.id);

                  this.props.removeNfc(index);
                }
                console.warn(this.props.nfcs);
                this.setState({isReading:false});
              });
              await NfcManager.registerTagEvent();
              this.setState({isReading:true});
            } catch (ex) {
              console.warn('ex', ex);
              NfcManager.unregisterTagEvent();
              this.setState({isReading:false});
            }
          }}
        />
        <Text>{this.state.isReading ? "AAA": "bbb"}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    nfcs: state.nfcs,
  };
};

export default connect(
  mapStateToProps,
  {
    addNfc,
    removeNfc,
  },
)(Nfc);
