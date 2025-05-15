import { actionType } from '@/app/redux/action/KategoriInterior/type';
import axios from 'axios';

// Data Json
import DataKategoriInterior from './data-kategori-interior.json';

// Read
export const getListKategoriInterior = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/KategoriInterior');
      const dataKategoriInterior = response?.data?.data;
      if (dataKategoriInterior?.length > 0) {
        dispatch(saveListKategoriInterior(dataKategoriInterior));
      } else {
        dispatch(saveListKategoriInterior(DataKategoriInterior));
      }
    } catch (error) {
      console.error('Error fetching Kategori Interior from API:', error);
      dispatch(saveListKategoriInterior(DataKategoriInterior));
    }
  };
};

export const saveListKategoriInterior = payload => {
  return {
    type: actionType.loadKategoriInterior,
    payload: payload
  };
};
