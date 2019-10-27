import {ADD_ACTIVE_ALARM, REMOVE_ACTIVE_ALARM} from '../actions/actions';

const activeAlarms = (state = [], action) => {
  switch (action.type) {
    case ADD_ACTIVE_ALARM:
      return [...state, action.alarmInfo];
    case REMOVE_ACTIVE_ALARM:
      const ret = [...state];
      ret.splice(action.index, 1);
      return ret;
    default:
      return state;
  }
};

export default activeAlarms;
