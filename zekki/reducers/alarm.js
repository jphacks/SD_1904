import {ADD_ALARM, REMOVE_ALARM, REPLACE_ALARM} from '../actions/actions';

const alarms = (state = [], action) => {
  switch (action.type) {
    case ADD_ALARM:
      const addID = getAlarmID(action.alarmInfo);
      action.alarmInfo.alarmID = '' + addID;
      return state.concat(action.alarmInfo);
    case REMOVE_ALARM:
      const ret = deepCopy(state);
      ret.splice(action.index, 1);
      return ret;
    case REPLACE_ALARM:
      const ret_rep = deepCopy(state);
      const replaceID = getAlarmID(action.alarmInfo);
      action.alarmInfo.alarmID = '' + replaceID;
      ret_rep.splice(action.index, 1, action.alarmInfo);
      return ret_rep;
    default:
      return state;
  }
};

const getAlarmID = alarmInfo => {
  const date = new Date();
  const alarmID =
    date.getMonth() +
    date.getDate() +
    date.getHours() +
    date.getMinutes() +
    alarmInfo.hour +
    alarmInfo.minutes;
  return alarmID;
};

const deepCopy = alarmInfo => {
  const ret = [];
  for (const a of alarmInfo) {
    const obj = {};
    for (const k of Object.keys(a)) {
      if (Array.isArray(a[k])) {
        obj[k] = [...a[k]];
      } else {
        obj[k] = a[k];
      }
    }
    ret.push(obj);
  }
  return ret;
};

export default alarms;
