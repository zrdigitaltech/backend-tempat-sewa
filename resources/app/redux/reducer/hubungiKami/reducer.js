import { initialState } from '@/app/redux/action/hubungiKami/state';
import { actionType } from '@/app/redux/action/hubungiKami/type';

export const hubungiKamiReducer = (state = initialState, action) => {
  switch (action.type) {
    // Read
    case actionType.loadHubungiKami:
      state = {
        ...state,
        hubungiKamiList: action.payload
      };
      return state;
    case actionType.loadHubungiKamiResetData:
      return initialState;
    default:
      return state;
  }
};

export default hubungiKamiReducer;
