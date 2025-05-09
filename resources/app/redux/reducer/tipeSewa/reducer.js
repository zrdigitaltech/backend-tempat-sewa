import { initialState } from '@/app/redux/action/tipeSewa/state';
import { actionType } from '@/app/redux/action/tipeSewa/type';

export const tipeSewaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadTipeSewa:
      state = {
        ...state,
        tipeSewaList: action.payload
      };
      return state;
    case actionType.loadTipeSewaResetData:
      return initialState;
    default:
      return state;
  }
};

export default tipeSewaReducer;
