import { actionType } from '@/redux/action/banners/type';
import axios from 'axios';

// Data Json
import DataBanners from './data-banners.json';

// Read
export const getListBanners = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/banner');
      const dataBanners = response?.data?.data;
      if (dataBanners?.length > 0) {
        dispatch(saveListBanners(dataBanners));
      } else {
        dispatch(saveListBanners(DataBanners));
      }
    } catch (error) {
      console.error('Error fetching banners from API:', error);
      dispatch(saveListBanners(DataBanners));
    }
  };
};

// Action to save the list of banners
export const saveListBanners = payload => {
  return {
    type: actionType.loadBanners,
    payload: payload
  };
};
