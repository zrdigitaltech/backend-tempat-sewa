import { actionType } from '@/app/redux/action/tipeSewa/type';
import axios from 'axios';

// Data Json
import DataTipeSewa from './data-tipe-sewa.json';

// Read
export const getListTipeSewa = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/tipeSewa');
      const dataTipeSewa = response?.data?.data;
      if (dataTipeSewa?.length > 0) {
        dispatch(saveListTipeSewa(dataTipeSewa));
      } else {
        dispatch(saveListTipeSewa(DataTipeSewa));
      }
    } catch (error) {
      console.error('Error fetching TipeSewa from API:', error);
      dispatch(saveListTipeSewa(DataTipeSewa));
    }
  };
};

export const saveListTipeSewa = payload => {
  return {
    type: actionType.loadTipeSewa,
    payload: payload
  };
};
