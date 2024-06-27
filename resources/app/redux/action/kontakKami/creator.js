import { actionType } from '@/redux/action/kontakKami/type';
import axios from 'axios';

// Data Json
import DataKontakKami from './data-kontak-kami.json';

// Read
export const getListKontakKami = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/contact-us');
      const dataKontakKami = response?.data?.data;
      if (dataKontakKami?.length > 0) {
        dispatch(saveListKontakKami(dataKontakKami[0]));
      } else {
        dispatch(saveListKontakKami(DataKontakKami[0]));
      }
    } catch (error) {
      console.error('Error fetching contact us from API:', error);
      dispatch(saveListKontakKami(DataKontakKami[0]));
    }
  };
};

// Action to save the list of kontak kami
export const saveListKontakKami = payload => {
  return {
    type: actionType.loadKontakKami,
    payload: payload
  };
};
