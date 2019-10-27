import {combineReducers} from 'redux';
import alarms from './alarm';
import nfcs from './nfc';
import defaultAlarm from './defaultAlarm';

export default combineReducers({
  alarms,
  defaultAlarm,
  nfcs,
});
