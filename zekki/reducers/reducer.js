import {combineReducers} from 'redux';
import alarms from './alarm';
import nfcs from './nfc';

export default combineReducers({
  alarms,
  nfcs,
});
