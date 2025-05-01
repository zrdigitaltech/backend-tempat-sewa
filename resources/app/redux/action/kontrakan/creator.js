import { actionType } from '@/app/redux/action/kontrakan/type';
import axios from 'axios';

// Data Json
import DataKontrakan from './data-kontrakan.json';

// Read
export const getListKontrakan = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/kontrakan');
      const dataKontrakan = response?.data?.data;
      if (dataKontrakan?.length > 0) {
        dispatch(saveListKontrakan(dataKontrakan));
      } else {
        dispatch(saveListKontrakan(DataKontrakan));
      }
    } catch (error) {
      console.error('Error fetching kontrakan from API:', error);
      const memberPriority = {
        'Super Featured': 1,
        Premium: 2,
        Free: 3
      };
      const sortedList = [...DataKontrakan].sort(
        (a, b) => memberPriority[a.member] - memberPriority[b.member]
      );
      dispatch(saveListKontrakan(sortedList));
    }
  };
};

// Get List Lainnya
export const getListLainnya = slug => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/v1/kontrakanLainnya?slug=${slug}`);
      const dataKontrakan = response.data.data;
      if (dataKontrakan?.length > 0) {
        dispatch(saveListKontrakanLainnya(dataKontrakan)); // Dispatch filtered data
      } else {
        // Filter out the current property based on slug
        const filteredKontrakan = DataKontrakan.filter(kontrakan => kontrakan.slug !== slug);
        dispatch(saveListKontrakanLainnya(filteredKontrakan)); // Fallback to static data
      }
    } catch (error) {
      console.error('Error fetching kontrakan lainnya:', error);
      // Filter out the current property based on slug
      const memberPriority = {
        'Super Featured': 1,
        Premium: 2,
        Free: 3
      };
      const filteredKontrakan = DataKontrakan.filter(kontrakan => kontrakan.slug !== slug);
      const sortedList = [...filteredKontrakan].sort(
        (a, b) => memberPriority[a.member] - memberPriority[b.member]
      );
      dispatch(saveListKontrakanLainnya(sortedList)); // Fallback on error
    }
  };
};

// Action to save the list of kontrakan
export const saveListKontrakan = payload => {
  return {
    type: actionType.loadKontrakan,
    payload: payload
  };
};

export const saveListKontrakanLainnya = payload => {
  return {
    type: actionType.loadKontrakanLainnya,
    payload: payload
  };
};
