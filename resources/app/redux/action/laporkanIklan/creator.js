import { actionType } from '@/app/redux/action/laporkanIklan/type';
import axios from 'axios';

export const submitLaporkanIklan = formData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/laporkanIklan', formData);
      dispatch(laporkanIklan(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Laporkan Iklan error:', error);
      return { success: false, error };
    }
  };
};

export const laporkanIklan = payload => {
  return {
    type: actionType.loadLaporkanIklan,
    payload: payload
  };
};
