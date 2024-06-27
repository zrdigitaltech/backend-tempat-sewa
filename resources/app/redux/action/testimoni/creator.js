import { actionType } from '@/redux/action/testimoni/type';
import axios from 'axios';

// Data Json
import DataTestimoni from './data-testimoni.json';

// Read
export const getListTestimoni = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/about-us');
      const dataTestimoni = response?.data?.data;
      if (dataTestimoni?.length > 0) {
        dispatch(saveListTestimoni(dataTestimoni));
      } else {
        dispatch(saveListTestimoni(DataTestimoni));
      }
    } catch (error) {
      console.error('Error fetching testimoni from API:', error);
      dispatch(saveListTestimoni(DataTestimoni));
    }
  };
};

// Read
export const saveListTestimoni = payload => {
  return {
    type: actionType.loadTestimoni,
    payload: payload
  };
};
