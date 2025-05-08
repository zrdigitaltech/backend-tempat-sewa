import { initialState } from '@/app/redux/action/kategori/state';
import { actionType } from '@/app/redux/action/kategori/type';

export const kategoriReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadKategori:
      state = {
        ...state,
        kategoriList: action.payload
      };
      return state;
    case actionType.loadKategoriResetData:
      return initialState;
    default:
      return state;
  }
};

export default kategoriReducer;
