import { initialState } from '@/redux/action/numberLayanan/state';
import { actionType } from '@/redux/action/numberLayanan/type';

export const numberLayananReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadNumberLayanan:
      state = {
        ...state,
        numberLayananList: action.payload
      };
      return state;
    case actionType.loadNumberLayananResetData:
      return initialState;
    default:
      return state;
  }
};

export default numberLayananReducer;
