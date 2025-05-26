import { initialState } from '@/app/redux/action/hubungiPengiklanProperti/state';
import { actionType } from '@/app/redux/action/hubungiPengiklanProperti/type';

export const hubungiPengiklanPropertiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadHubungiPengiklanProperti:
      state = {
        ...state,
        hubungiPengiklanProperti: action.payload
      };
      return state;

    case actionType.loadVerifikasi:
      state = {
        ...state,
        verifikasi: action.payload
      };
      return state;

    case actionType.loadHubungiPengiklanPropertiResetData:
      return initialState;
    default:
      return state;
  }
};

export default hubungiPengiklanPropertiReducer;
