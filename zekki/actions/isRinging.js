import {SET_IS_RINGING, SET_IS_RESTARTED, SET_ALARM_ID} from './actions';

export const setIsRinging = isRinging => {
  return {
    type: SET_IS_RINGING,
    isRinging: isRinging,
  };
};

export const setIsRestarted = isRestarted => {
  return {
    type: SET_IS_RESTARTED,
    isRestarted: isRestarted,
  };
};

export const setAlarmID = alarmID => {
  return {
    type: SET_ALARM_ID,
    alarmID: alarmID,
  };
};
