import { actionType } from '@/app/redux/action/hubungiPengiklanProperti/type';
import axios from 'axios';

export const submitHubungiPengiklanProperti = formData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/hubungiPengiklanProperti', formData);
      dispatch(hubungiPengiklanProperti(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit formHubungiPengiklanProperti error:', error);
      return { success: false, error };
    }
  };
};

export const submitVerifikasi = formData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/verifikasi', formData);
      dispatch(verifikasi(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit formVerifikasi error:', error);
      return { success: false, error };
    }
  };
};

export const hubungiPengiklanProperti = payload => {
  return {
    type: actionType.loadHubungiPengiklanProperti,
    payload: payload
  };
};

export const verifikasi = payload => {
  return {
    type: actionType.loadVerifikasi,
    payload: payload
  };
};
