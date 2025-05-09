import { actionType } from '@/app/redux/action/tipeKost/type';
import axios from 'axios';

// Data Json
import DataTipeKost from './data-tipe-kost.json';

// Read
export const getListTipeKost = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/tipeKost');
      const dataTipeKost = response?.data?.data;
      if (dataTipeKost?.length > 0) {
        dispatch(saveListTipeKost(dataTipeKost));
      } else {
        dispatch(saveListTipeKost(DataTipeKost));
      }
    } catch (error) {
      console.error('Error fetching TipeKost from API:', error);
      dispatch(saveListTipeKost(DataTipeKost));
    }
  };
};

export const saveListTipeKost = payload => {
  return {
    type: actionType.loadTipeKost,
    payload: payload
  };
};
