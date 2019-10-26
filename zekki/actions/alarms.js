import {ADD_ALARM, REMOVE_ALARM} from './actions';

export const addAlarm = alarmInfo => {
  return {
    type: ADD_ALARM,
    alarmInfo: alarmInfo,
  };
};

export const removeAlarm = index => {
  return {
    type: REMOVE_ALARM,
    index: index,
  };
};
