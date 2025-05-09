import { actionType } from '@/app/redux/action/tipeKamar/type';
import axios from 'axios';

// Data Json
import DataTipeKamar from './data-tipe-kamar.json';

// Read
export const getListTipeKamar = tipeProperti => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/tipeKamar');
      const dataTipeKamar = response?.data?.data;
      if (dataTipeKamar?.length > 0) {
        dispatch(saveListTipeKamar(dataTipeKamar));
      } else {
        const filteredOptions = DataTipeKamar.filter(
          option => !option.condition || option.condition === tipeProperti
        );
        dispatch(saveListTipeKamar(filteredOptions));
      }
    } catch (error) {
      console.error('Error fetching TipeKamar from API:', error);
      const filteredOptions = DataTipeKamar.filter(
        option => !option.condition || option.condition === tipeProperti
      );
      dispatch(saveListTipeKamar(filteredOptions));
    }
  };
};

export const saveListTipeKamar = payload => {
  return {
    type: actionType.loadTipeKamar,
    payload: payload
  };
};
