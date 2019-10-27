import {ADD_ACTIVE_ALARM, REMOVE_ACTIVE_ALARM} from './actions';

export const addActiveAlarm = alarmInfo => {
  return {
    type: ADD_ACTIVE_ALARM,
    alarmInfo: alarmInfo,
  };
};

export const removeActiveAlarm = index => {
  return {
    type: REMOVE_ACTIVE_ALARM,
    index: index,
  };
};
