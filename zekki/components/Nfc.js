import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {ButtonGroup, Avatar} from 'react-native-elements';

class Nfc extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedIndex: 0,
      isReading: false,
    };
  }

  onPress(_selectedIndex) {
    this.setState({selectedIndex: _selectedIndex});
    console.log(_selectedIndex);
    if (_selectedIndex === 0) {
      (async () => {
        try {
          NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            NfcManager.unregisterTagEvent().catch(() => 0);
            if (!this.props.nfcs.includes(tag.id)) {
              console.warn(tag.id);
              const index = this.props.nfcs.indexOf(tag.id);
              this.props.addNfc(tag.id);
            }
            console.warn(this.props.nfcs);
            this.setState({isReading: false});
          });
          await NfcManager.registerTagEvent();
          this.setState({isReading: true});
        } catch (ex) {
          console.warn('ex', ex);
          NfcManager.unregisterTagEvent();
          this.setState({isReading: false});
        }
      })();
    } else if (_selectedIndex === 1) {
      (async () => {
        try {
          NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            NfcManager.unregisterTagEvent().catch(() => 0);
            console.warn(tag.id);

            if (this.props.nfcs.includes(tag.id)) {
              const index = this.props.nfcs.indexOf(tag.id);

              this.props.removeNfc(index);
            }
            console.warn(this.props.nfcs);
            this.setState({isReading: false});
          });
          await NfcManager.registerTagEvent();
          this.setState({isReading: true});
        } catch (ex) {
          console.warn('ex', ex);
          NfcManager.unregisterTagEvent();
          this.setState({isReading: false});
        }
      })();
    }
  }

  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmout() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    const buttons = ['追加', '削除'];
    // const {Avatar} = '<Text>dffe</Text>';

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 4}}>
          {(() => {
            if (this.state.isReading) {
              return <Text>読取中</Text>;
            } else {
              return <Text>ゴミ</Text>;
            }
          })()}
        </View>

        <View style={{flex: 1, margin: 0}}>
          <ButtonGroup
            onPress={selectedIndex => this.onPress(selectedIndex)}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: '100%',
              width: '100%',
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
            }}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  button: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
