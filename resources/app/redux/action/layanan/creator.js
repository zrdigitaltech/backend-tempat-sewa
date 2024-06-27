import { actionType } from '@/redux/action/layanan/type';
import axios from 'axios';

// Data Json
import DataLayanan from './data-layanan.json';

// Read
export const getListLayanan = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/services');
      const dataLayanan = response?.data?.data;
      if (dataLayanan?.length > 0) {
        dispatch(saveListLayanan(dataLayanan));
      } else {
        dispatch(saveListLayanan(DataLayanan));
      }
    } catch (error) {
      console.error('Error fetching services from API:', error);
      dispatch(saveListLayanan(DataLayanan));
    }
  };
};

// Action to save the list of layanan
export const saveListLayanan = payload => {
  return {
    type: actionType.loadLayanan,
    payload: payload
  };
};
