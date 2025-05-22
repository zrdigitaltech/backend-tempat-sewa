import { actionType } from '@/app/redux/action/panduan/type';
import axios from 'axios';
import { formatStrip, unFormatStrip } from '@/app/helpers';

// Data Json
import DataPanduan from './data-panduan.json';

// Read
export const getListPanduan = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/panduan');
      const dataPanduan = response?.data?.data;
      if (dataPanduan?.length > 0) {
        dispatch(saveListPanduan(dataPanduan));
      } else {
        dispatch(saveListPanduan(DataPanduan));
      }
    } catch (error) {
      console.error('Error fetching panduan from API:', error);
      dispatch(saveListPanduan(DataPanduan));
    }
  };
};

const filterPanduanLokal = queryObj => {
  return DataPanduan.filter(item => {
    const { keyword, kategori } = queryObj;

    const keywordMatch = keyword
      ? formatStrip(item.title).toLowerCase().includes(keyword.toLowerCase())
      : true;

    const kategoriMatch = kategori
      ? formatStrip(item.kategori)?.toLowerCase() === kategori.toLowerCase()
      : true;

    return keywordMatch && kategoriMatch;
  });
};

export const getPanduanSearch = queryObj => {
  return async dispatch => {
    const queryString = new URLSearchParams(queryObj).toString();
    try {
      const response = await axios?.get(`/api/v1/panduan?${queryString}`);
      const dataPanduan = response?.data?.data;
      if (dataPanduan?.length > 0) {
        dispatch(savePanduanSearch(dataPanduan));
      } else {
        const filteredList = filterPanduanLokal(queryObj);
        dispatch(savePanduanSearch(filteredList));
      }
    } catch (error) {
      console.error('Error fetching search result from API:', error);
      const filteredList = filterPanduanLokal(queryObj);
      dispatch(savePanduanSearch(filteredList));
    }
  };
};

export const saveListPanduan = payload => {
  return {
    type: actionType.loadPanduan,
    payload: payload
  };
};

export const savePanduanSearch = payload => {
  return {
    type: actionType.loadPanduanSearch,
    payload: payload
  };
};
