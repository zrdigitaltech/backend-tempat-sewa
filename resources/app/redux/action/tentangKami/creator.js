import { actionType } from '@/redux/action/tentangKami/type';
import axios from 'axios';

// Data Json
import DataTentangKami from './data-tentang-kami.json';

// Read
export const getListTentangKami = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/about-us');
      const dataTentangKami = response?.data?.data;
      if (dataTentangKami?.length > 0) {
        dispatch(saveListTentangKami(dataTentangKami[0]));
      } else {
        dispatch(saveListTentangKami(DataTentangKami[0]));
      }
    } catch (error) {
      console.error('Error fetching about us from API:', error);
      dispatch(saveListTentangKami(DataTentangKami[0]));
    }
  };
};

// Action to save the list of tentang kami
export const saveListTentangKami = payload => {
  return {
    type: actionType.loadTentangKami,
    payload: payload
  };
};
