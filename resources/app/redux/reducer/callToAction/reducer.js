import { initialState } from '@/redux/action/callToAction/state';
import { actionType } from '@/redux/action/callToAction/type';

export const callToActionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadCallToAction:
      state = {
        ...state,
        callToActionList: action.payload
      };
      return state;
    case actionType.loadCallToActionResetData:
      return initialState;
    default:
      return state;
  }
};

export default callToActionReducer;
