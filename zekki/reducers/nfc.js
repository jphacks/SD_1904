import {ADD_NFC, REMOVE_NFC} from '../actions/actions';

const nfcs = (state = [], action) => {
  switch (action.type) {
    case ADD_NFC:
      return [...state, action.nfcInfo];
    case REMOVE_NFC:
      const ret = [...state];
      ret.splice(action.index, 1);
      return ret;
    default:
      return state;
  }
};

export default nfcs;
