import {combineReducers} from 'redux';
import alarms from './alarm';
import nfcs from './nfc';
import isRinging from './isRinging';
import defaultAlarm from './defaultAlarm';

export default combineReducers({
  alarms,
  defaultAlarm,
  isRinging,
  nfcs,
});
