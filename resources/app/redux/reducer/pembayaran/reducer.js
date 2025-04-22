import { initialState } from '@/app/redux/action/pembayaran/state';
import { actionType } from '@/app/redux/action/pembayaran/type';

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
