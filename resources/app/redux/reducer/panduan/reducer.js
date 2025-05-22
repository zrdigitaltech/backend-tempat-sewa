import { initialState } from '@/app/redux/action/panduan/state';
import { actionType } from '@/app/redux/action/panduan/type';

export const panduanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadPanduan:
      state = {
        ...state,
        panduanList: action.payload
      };
      return state;

    case actionType.loadPanduanSearch:
      state = {
        ...state,
        panduanSearch: action.payload
      };
      return state;

    case actionType.loadPanduanDetail:
      state = {
        ...state,
        panduanDetail: action.payload
      };
      return state;

    case actionType.loadPanduanResetData:
      return initialState;
    default:
      return state;
  }
};

export default panduanReducer;
