import { initialState } from '@/redux/action/areaLayanan/state';
import { actionType } from '@/redux/action/areaLayanan/type';

export const areaLayananReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadAreaLayanan:
      state = {
        ...state,
        areaLayananList: action.payload
      };
      return state;
    case actionType.loadAreaLayananResetData:
      return initialState;
    default:
      return state;
  }
};

export default areaLayananReducer;
