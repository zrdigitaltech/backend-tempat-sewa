import { initialState } from '@/redux/action/timKami/state';
import { actionType } from '@/redux/action/timKami/type';

export const timKamiReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadTimKami:
      state = {
        ...state,
        timKamiList: action.payload
      };
      return state;
    case actionType.loadTimKamiResetData:
      return initialState;
    default:
      return state;
  }
};

export default timKamiReducer;
