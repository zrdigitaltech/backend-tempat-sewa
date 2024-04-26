import { initialState } from '@/redux/action/pembayaran/state';
import { actionType } from '@/redux/action/pembayaran/type';

export const pembayaranReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadPembayaran:
      state = {
        ...state,
        pembayaranList: action.payload
      };
      return state;
    case actionType.loadPembayaranResetData:
      return initialState;
    default:
      return state;
  }
};

export default pembayaranReducer;
