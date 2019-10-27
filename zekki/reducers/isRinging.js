import {SET_IS_RINGING} from '../actions/actions';

const isRinging = (state = false, action) => {
  switch (action.type) {
    case SET_IS_RINGING:
      return action.isRinging;
    default:
      return state;
  }
};

export default isRinging;
