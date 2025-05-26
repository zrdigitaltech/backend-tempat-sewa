import { actionType } from '@/app/redux/action/konsultasi/type';
import axios from 'axios';

export const submitKonsultasi = formData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/konsultasi', formData);
      dispatch(konsultasi(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Konsultasi error:', error);
      return { success: false, error };
    }
  };
};

export const konsultasi = payload => {
  return {
    type: actionType.loadKonsultasi,
    payload: payload
  };
};
