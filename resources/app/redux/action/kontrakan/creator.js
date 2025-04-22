import { actionType } from '@/app/redux/action/kontrakan/type';
import axios from 'axios';

// Data Json
import DataKontrakan from './data-kontrakan.json';

// Read
export const getListKontrakan = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/kontrakan');
      const dataKontrakan = response?.data?.data;
      if (dataKontrakan?.length > 0) {
        dispatch(saveListKontrakan(dataKontrakan));
      } else {
        dispatch(saveListKontrakan(DataKontrakan));
      }
    } catch (error) {
      console.error('Error fetching kontrakan from API:', error);
      dispatch(saveListKontrakan(DataKontrakan));
    }
  };
};

// Action to save the list of kontrakan
export const saveListKontrakan = payload => {
  return {
    type: actionType.loadKontrakan,
    payload: payload
  };
};
