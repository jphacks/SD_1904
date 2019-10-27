import {ADD_ALARM, REMOVE_ALARM, REPLACE_ALARM} from './actions';

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

export const replaceAlarm = (index, alarmInfo) => {
  return {
    type: REPLACE_ALARM,
    index: index,
    alarmInfo: alarmInfo,
  };
};
