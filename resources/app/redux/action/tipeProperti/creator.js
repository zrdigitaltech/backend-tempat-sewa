import { actionType } from '@/app/redux/action/tipeProperti/type';
import axios from 'axios';

// Data Json
import DataTipeProperti from './data-tipe-properti.json';

// Read
export const getListTipeProperti = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/tipeProperti');
      const dataTipeProperti = response?.data?.data;
      if (dataTipeProperti?.length > 0) {
        dispatch(saveListTipeProperti(dataTipeProperti));
      } else {
        dispatch(saveListTipeProperti(DataTipeProperti));
      }
    } catch (error) {
      console.error('Error fetching TipeProperti from API:', error);
      dispatch(saveListTipeProperti(DataTipeProperti));
    }
  };
};

//
export const getListTempat = tipeProperti => {
  return async dispatch => {
    try {
      const response = await axios?.get(`/api/v1/tipeProperti${tipeProperti}`);
      const dataTipeProperti = response?.data?.data;
      if (dataTipeProperti?.length > 0) {
        dispatch(saveListTempat(dataTipeProperti));
      } else {
        const current = DataTipeProperti.find(
          item =>
            item.slug === tipeProperti || item.nama.toLowerCase() === tipeProperti.toLowerCase()
        );
        const kategoriSaatIni = current?.kategori;

        const filterData = DataTipeProperti.filter(
          item => item.kategori === kategoriSaatIni && item.slug !== tipeProperti
        );

        dispatch(saveListTempat(filterData));
      }
    } catch (error) {
      console.error('Error fetching Tempat from API:', error);
      const current = DataTipeProperti.find(
        item => item.slug === tipeProperti || item.nama.toLowerCase() === tipeProperti.toLowerCase()
      );
      const kategoriSaatIni = current?.kategori;

      const filterData = DataTipeProperti.filter(
        item => item.kategori === kategoriSaatIni && item.slug !== tipeProperti
      );

      dispatch(saveListTempat(filterData));
    }
  };
};

export const saveListTipeProperti = payload => {
  return {
    type: actionType.loadTipeProperti,
    payload: payload
  };
};

export const saveListTempat = payload => {
  return {
    type: actionType.loadTempat,
    payload: payload
  };
};
