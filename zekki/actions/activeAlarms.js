import {ADD_ACTIVE_ALARM, REMOVE_ACTIVE_ALARM} from './actions';

export const addAlarm = alarmInfo => {
  return {
    type: ADD_ACTIVE_ALARM,
    alarmInfo: alarmInfo,
  };
};

export const removeAlarm = index => {
  return {
    type: REMOVE_ACTIVE_ALARM,
    index: index,
  };
};
