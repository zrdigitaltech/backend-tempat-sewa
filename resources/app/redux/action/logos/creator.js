import { actionType } from '@/redux/action/logos/type';
import axios from 'axios';

// Data Json
import DataLogos from './data-logos.json';

// Read
export const getListLogos = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/logos');
      const dataLogos = response?.data?.data;
      if (dataLogos?.length > 0) {
        dispatch(saveListLogos(dataLogos[0]));
      } else {
        dispatch(saveListLogos(DataLogos[0]));
      }
    } catch (error) {
      console.error('Error fetching logos from API:', error);
      dispatch(saveListLogos(DataLogos[0]));
    }
  };
};

// Read
export const saveListLogos = payload => {
  return {
    type: actionType.loadLogos,
    payload: payload
  };
};
