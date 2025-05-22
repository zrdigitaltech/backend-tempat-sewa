import { actionType } from '@/app/redux/action/panduan/type';
import axios from 'axios';
import { formatStrip, unFormatStrip } from '@/app/helpers';

// Data Json
import DataPanduan from './data-panduan.json';

// Read
export const getListPanduan = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/panduan');
      const dataPanduan = response?.data?.data;
      if (dataPanduan?.length > 0) {
        dispatch(saveListPanduan(dataPanduan));
      } else {
        dispatch(saveListPanduan(DataPanduan));
      }
    } catch (error) {
      console.error('Error fetching panduan from API:', error);
      dispatch(saveListPanduan(DataPanduan));
    }
  };
};

export const saveListPanduan = payload => {
  return {
    type: actionType.loadPanduan,
    payload: payload
  };
};

