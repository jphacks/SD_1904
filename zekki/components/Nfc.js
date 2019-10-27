import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {addNfc, removeNfc} from '../actions/nfc';
import {connect} from 'react-redux';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {ButtonGroup, Avatar, Icon, Text} from 'react-native-elements';
import * as Progress from 'react-native-progress';

class Nfc extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedIndex: 0,
      isReading: false,
      height: 0,
      width:0,
    };
  }

  onLayout = (e) => {
    /* コンポーネントの高さを取得し、stateに保存 */
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
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
    return (
      <View onLayout={this.onLayout} style={{flex: 1, flexDirection: 'column'}}>
        {/* <View style={{flex: 4}}> */}
          {(() => {
            if (this.state.isReading) {
              return (
                <View style={{flex: 4,}}>
                <Progress.Circle thickness={3} size={100} indeterminate={true} style={{position:'absolute', bottom:'40%',right:'40%'}} />
                <Text h4 style={{top:50,textAlign:'center',color:'gray'}}>読み込み中</Text>
                  <Icon
                    name='nfc'
                    size={400}
                    containerStyle={{opacity:0.1,top:50,}}
                  />
              </View>
              );
            } else {
              return (
                <View　style={{flex: 4}}>
                <Text h4 style={{top:50,textAlign:'center',color:'gray'}}>NFCをタッチしてください</Text>
                  <Icon
                    name='nfc'
                    size={400}
                    containerStyle={{opacity:0.1,top:50,}}
                  />
                  </View>
              );
              // return <View style={styles.circle}><Text　style={styles.text}>NFCをタッチしてください</Text></View>;
            }
          })()}
        {/* </View> */}

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
  circle: {
    position: 'relative',
    width:200,
    height:200,
    top:100,
    bottom:100,
    right:100,
    left:100,
    borderRadius:100,

    backgroundColor:'blue',
  },
  text:{
    top:50,
    fontSize: 30,
    color:"white",
  },
});


