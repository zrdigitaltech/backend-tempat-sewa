import { initialState } from '@/redux/action/banners/state';
import { actionType } from '@/redux/action/banners/type';

export const bannersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadBanners:
      state = {
        ...state,
        bannersList: action.payload
      };
      return state;
    case actionType.loadBannersResetData:
      return initialState;
    default:
      return state;
  }
};

export default bannersReducer;
