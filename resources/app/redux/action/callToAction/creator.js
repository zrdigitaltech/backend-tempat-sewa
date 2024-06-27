import { actionType } from '@/redux/action/callToAction/type';
import axios from 'axios';

// Data Json
import DataCallToAction from './data-call-to-action.json';

// Read
export const getListCallToAction = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/call-to-action');
      const dataCallToAction = response?.data?.data;
      if (dataCallToAction?.length > 0) {
        dispatch(saveListCallToAction(dataCallToAction[0]));
      } else {
        dispatch(saveListCallToAction(DataCallToAction[0]));
      }
    } catch (error) {
      console.error('Error fetching call to action from API:', error);
      dispatch(saveListCallToAction(DataCallToAction[0]));
    }
  };
};

// Action to save the list of call to action
export const saveListCallToAction = payload => {
  return {
    type: actionType.loadCallToAction,
    payload: payload
  };
};
