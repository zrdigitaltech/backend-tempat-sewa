import { actionType } from '@/app/redux/action/pembayaran/type';
import axios from 'axios';

// Data Json
import DataPembayaran from './data-pembayaran.json';

// Read
export const getListPembayaran = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/payment');
      const dataPembayaran = response?.data?.data;
      if (dataPembayaran?.length > 0) {
        dispatch(saveListPembayaran(dataPembayaran));
      } else {
        dispatch(saveListPembayaran(DataPembayaran));
      }
    } catch (error) {
      console.error('Error fetching payment from API:', error);
      dispatch(saveListPembayaran(DataPembayaran));
    }
  };
};

// Action to save the list of pembayaran
export const saveListPembayaran = payload => {
  return {
    type: actionType.loadPembayaran,
    payload: payload
  };
};
