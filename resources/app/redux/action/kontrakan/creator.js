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

export const getPropertiDetail = slug => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/v1/kontrakanDetail?slug=${slug}`);
      const detail = response.data.data;
      if (detail) {
        dispatch(saveKontrakanDetail(detail));
      } else {
        // fallback dari JSON statis
        const fallback = DataKontrakan.find(item => item.slug === slug);
        if (fallback) {
          dispatch(saveKontrakanDetail(fallback));
        }
      }
    } catch (error) {
      console.error('Error fetching properti detail:', error);
      const fallback = DataKontrakan.find(item => item.slug === slug);
      if (fallback) {
        dispatch(saveKontrakanDetail(fallback));
      }
    }
  };
};

export const getSearchResult = (query) => {
  return async dispatch => {
    try {
      const response = await axios?.get(`/api/v1/kontrakan${query}`);
      const dataKontrakan = response?.data?.data;
      if (dataKontrakan?.length > 0) {
        dispatch(saveSearchResult(dataKontrakan));
      } else {
        dispatch(saveSearchResult(DataKontrakan));
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
      dispatch(saveSearchResult(sortedList));
    }
  };
};

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

export const saveKontrakanDetail = payload => {
  return {
    type: actionType.loadKontrakanDetail,
    payload: payload
  };
};

export const saveSearchResult = payload => {
  return {
    type: actionType.loadSearchResult,
    payload: payload
  };
};
