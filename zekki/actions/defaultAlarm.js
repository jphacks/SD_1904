import {SET_DEFAULT_ALARM} from './actions';

export const setDefaultAlarm = alarmInfo => {
  return {
    type: SET_DEFAULT_ALARM,
    alarmInfo: alarmInfo,
  };
};
