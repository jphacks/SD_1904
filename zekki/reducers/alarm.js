import {ADD_ALARM, REMOVE_ALARM, REPLACE_ALARM} from '../actions/actions';

const alarms = (state = [], action) => {
  switch (action.type) {
    case ADD_ALARM:
      return state.concat(action.alarmInfo);
    case REMOVE_ALARM:
      // const ret = state.concat();
      const ret = deepCopy(state);
      ret.splice(action.index, 1);
      return ret;
    case REPLACE_ALARM:
      // const ret_rep = state.concat();
      const ret_rep = deepCopy(state);
      ret_rep.splice(action.index, 1, action.alarmInfo);
      return ret_rep;
    default:
      return state;
  }
};

const deepCopy = state => {
  const ret = [];
  for (const s of state) {
    const obj = {};
    for (const k of Object.keys(s)) {
      if (Array.isArray(s[k])) {
        obj[k] = [...s[k]];
      } else {
        obj[k] = s[k];
      }
    }
    ret.push(obj);
  }
  return ret;
};

export default alarms;
