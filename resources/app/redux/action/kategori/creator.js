import { actionType } from '@/app/redux/action/kategori/type';
import axios from 'axios';

// Data Json
import DataKategori from './data-kategori.json';

// Read
export const getListKategori = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/kategori');
      const dataKategori = response?.data?.data;
      if (dataKategori?.length > 0) {
        dispatch(saveListKategori(dataKategori));
      } else {
        dispatch(saveListKategori(DataKategori));
      }
    } catch (error) {
      console.error('Error fetching kategori from API:', error);
      dispatch(saveListKategori(DataKategori));
    }
  };
};

export const saveListKategori = payload => {
  return {
    type: actionType.loadKategori,
    payload: payload
  };
};
