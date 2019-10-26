import {ADD_ALARM, REMOVE_ALARM} from '../actions/actions';

const alarms = (state = [], action) => {
  switch (action.type) {
    case ADD_ALARM:
      return [...state, action.alarmInfo];
    case REMOVE_ALARM:
      const ret = [...state];
      ret.splice(action.index, 1);
      return ret;
    default:
      return state;
  }
};

export default alarms;
