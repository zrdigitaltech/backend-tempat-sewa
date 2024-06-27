import { actionType } from '@/redux/action/numberLayanan/type';
import axios from 'axios';

// Data Json
import DataNumberLayanan from './data-number-layanan.json';

// Read
export const getListNumberLayanan = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/service-number');
      const dataNumberLayanan = response?.data?.data;
      if (dataNumberLayanan?.length > 0) {
        dispatch(saveListNumberLayanan(dataNumberLayanan[0]));
      } else {
        dispatch(saveListNumberLayanan(DataNumberLayanan[0]));
      }
    } catch (error) {
      console.error('Error fetching service number from API:', error);
      dispatch(saveListNumberLayanan(DataNumberLayanan[0]));
    }
  };
};

// Action to save the list of number layanan
export const saveListNumberLayanan = payload => {
  return {
    type: actionType.loadNumberLayanan,
    payload: payload
  };
};
