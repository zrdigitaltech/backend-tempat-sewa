import { initialState } from '@/redux/action/layanan/state';
import { actionType } from '@/redux/action/layanan/type';

export const layananReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadLayanan:
      state = {
        ...state,
        layananList: action.payload
      };
      return state;
    case actionType.loadLayananResetData:
      return initialState;
    default:
      return state;
  }
};

export default layananReducer;
