import { initialState } from '@/app/redux/action/KategoriInterior/state';
import { actionType } from '@/app/redux/action/KategoriInterior/type';

export const kategoriInteriorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadKategoriInterior:
      state = {
        ...state,
        kategoriInteriorList: action.payload
      };
      return state;
    case actionType.loadKategoriInteriorResetData:
      return initialState;
    default:
      return state;
  }
};

export default kategoriInteriorReducer;
