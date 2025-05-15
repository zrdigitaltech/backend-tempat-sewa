import { initialState } from '@/app/redux/action/interior/state';
import { actionType } from '@/app/redux/action/interior/type';

export const interiorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadInterior:
      state = {
        ...state,
        interiorList: action.payload
      };
      return state;
    case actionType.loadInteriorResetData:
      return initialState;
    default:
      return state;
  }
};

export default interiorReducer;
