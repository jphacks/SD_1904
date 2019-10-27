import {
  SET_IS_RINGING,
  SET_IS_RESTARTED,
  SET_ALARM_ID,
} from '../actions/actions';

const isRinging = (state = {}, action) => {
  switch (action.type) {
    case SET_IS_RINGING:
      return {...state, isRinging: action.isRinging};
    case SET_IS_RESTARTED:
      return {...state, isRestarted: action.isRestarted};
    case SET_ALARM_ID:
      return {...state, alarmID: action.alarmID};
    default:
      return state;
  }
};

export default isRinging;
