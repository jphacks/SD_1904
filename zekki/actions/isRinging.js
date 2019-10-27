import {SET_IS_RINGING} from './actions';

export const setIsRinging = isRinging => {
  return {
    type: SET_IS_RINGING,
    isRinging: isRinging,
  };
};
