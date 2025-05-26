import { actionType } from '@/app/redux/action/beriSaran/type';
import axios from 'axios';

export const submitBeriSaran = formData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/beriSaran', formData);
      dispatch(beriSaran(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Beri Saran error:', error);
      return { success: false, error };
    }
  };
};

export const beriSaran = payload => {
  return {
    type: actionType.loadBeriSaran,
    payload: payload
  };
};
