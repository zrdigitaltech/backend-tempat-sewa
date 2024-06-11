import { initialState } from '@/redux/action/kontakKami/state';
import { actionType } from '@/redux/action/kontakKami/type';

export const kontakKamiReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadKontakKami:
      state = {
        ...state,
        kontakKamiList: action.payload
      };
      return state;
    case actionType.loadKontakKamiResetData:
      return initialState;
    default:
      return state;
  }
};

export default kontakKamiReducer;
