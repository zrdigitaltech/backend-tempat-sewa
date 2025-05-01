import { initialState } from '@/app/redux/action/kontrakan/state';
import { actionType } from '@/app/redux/action/kontrakan/type';

export const kontrakanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadKontrakan:
      state = {
        ...state,
        kontrakanList: action.payload
      };
      return state;
    case actionType.loadKontrakanLainnya:
      state = {
        ...state,
        kontrakanListLainnya: action.payload
      };
      return state;
    case actionType.loadKontrakanResetData:
      return initialState;
    default:
      return state;
  }
};

export default kontrakanReducer;
