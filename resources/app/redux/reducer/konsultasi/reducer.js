import { initialState } from '@/app/redux/action/konsultasi/state';
import { actionType } from '@/app/redux/action/konsultasi/type';

export const konsultasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadKonsultasi:
      state = {
        ...state,
        konsultasi: action.payload
      };
      return state;

    case actionType.loadKonsultasiResetData:
      return initialState;
    default:
      return state;
  }
};

export default konsultasiReducer;
