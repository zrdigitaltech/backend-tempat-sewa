import { actionType } from '@/redux/action/callToAction/type';

// Data Json
import DataCallToAction from './data-call-to-action.json';

// Read
export const getListCallToAction = () => {
  return dispatch => {
    return dispatch(saveListCallToAction(DataCallToAction[0]));
  };
};

// Read
export const saveListCallToAction = payload => {
  return {
    type: actionType.loadCallToAction,
    payload: payload
  };
};
