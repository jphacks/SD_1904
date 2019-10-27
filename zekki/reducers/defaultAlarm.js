import {SET_DEFAULT_ALARM} from '../actions/actions';

const defaultAlarm = (state = {}, action) => {
  switch (action.type) {
    case SET_DEFAULT_ALARM:
      return action.alarmInfo;
    default:
      return state;
  }
};

export default defaultAlarm;
