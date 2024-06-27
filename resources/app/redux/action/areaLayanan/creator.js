import { actionType } from '@/redux/action/areaLayanan/type';
import axios from 'axios';

// Data Json
import DataAreaLayanan from './data-area-layanan.json';

// Read
export const getListAreaLayanan = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/service-area');
      const dataAreaLayanans = response?.data?.data;
      if (dataAreaLayanans?.length > 0) {
        dispatch(saveListAreaLayanan(dataAreaLayanans));
      } else {
        dispatch(saveListAreaLayanan(DataAreaLayanan));
      }
    } catch (error) {
      console.error('Error fetching service area from API:', error);
      dispatch(saveListAreaLayanan(DataAreaLayanan));
    }
  };
};

// Action to save the list of area layanan
export const saveListAreaLayanan = payload => {
  return {
    type: actionType.loadAreaLayanan,
    payload: payload
  };
};
