import { initialState } from '@/redux/action/kontrakan/state';
import { actionType } from '@/redux/action/kontrakan/type';

export const kontrakanReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadKontrakan:
      state = {
        ...state,
        kontrakanList: action.payload
      };
      return state;
    case actionType.loadKontrakanResetData:
      return initialState;
    default:
      return state;
  }
};

export default kontrakanReducer;
