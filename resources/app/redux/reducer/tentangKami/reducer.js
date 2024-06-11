import { initialState } from '@/redux/action/tentangKami/state';
import { actionType } from '@/redux/action/tentangKami/type';

export const tentangKamiReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadTentangKami:
      state = {
        ...state,
        tentangKamiList: action.payload
      };
      return state;
    case actionType.loadTentangKamiResetData:
      return initialState;
    default:
      return state;
  }
};

export default tentangKamiReducer;
