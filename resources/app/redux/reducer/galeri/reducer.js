import { initialState } from '@/redux/action/galeri/state';
import { actionType } from '@/redux/action/galeri/type';

export const galeriReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadGaleri:
      state = {
        ...state,
        galeriList: action.payload
      };
      return state;
    case actionType.loadGaleriResetData:
      return initialState;
    default:
      return state;
  }
};

export default galeriReducer;
