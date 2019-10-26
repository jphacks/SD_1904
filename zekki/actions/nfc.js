import {ADD_NFC, REMOVE_NFC} from './actions';

export const addNfc = nfcInfo => {
  return {
    type: ADD_NFC,
    nfcInfo: nfcInfo,
  };
};

export const removeNfc = index => {
  return {
    type: REMOVE_NFC,
    index: index,
  };
};
