import { actionType } from '@/redux/action/timKami/type';
import axios from 'axios';

// Data Json
import DataTimKami from './data-tim-kami.json';

// Read
export const getListTimKami = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/teams-us');
      const dataTimKami = response?.data?.data;
      if (dataTimKami?.length > 0) {
        dispatch(saveListTimKami(dataTimKami));
      } else {
        dispatch(saveListTimKami(DataTimKami));
      }
    } catch (error) {
      console.error('Error fetching team us from API:', error);
      dispatch(saveListTimKami(DataTimKami));
    }
  };
};

// Read
export const saveListTimKami = payload => {
  return {
    type: actionType.loadTimKami,
    payload: payload
  };
};
