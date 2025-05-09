import { initialState } from '@/app/redux/action/tipeProperti/state';
import { actionType } from '@/app/redux/action/tipeProperti/type';

export const tipePropertiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadTipeProperti:
      state = {
        ...state,
        tipePropertiList: action.payload
      };
      return state;
    case actionType.loadTipePropertiResetData:
      return initialState;
    default:
      return state;
  }
};

export default tipePropertiReducer;
