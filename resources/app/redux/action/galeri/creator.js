import { actionType } from '@/redux/action/galeri/type';
import axios from 'axios';

// Data Json
import DataGaleri from './data-galeri.json';

// Read
export const getListGaleri = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/gallery');
      const dataGaleri = response?.data?.data;
      const transformedData = dataGaleri?.map(item => ({
        ...item,
        src: item.image,
        original: item.image
      }));
      if (transformedData?.length > 0) {
        dispatch(saveListGaleri(transformedData));
      } else {
        dispatch(saveListGaleri(DataGaleri));
      }
    } catch (error) {
      console.error('Error fetching gallery from API:', error);
      dispatch(saveListGaleri(DataGaleri));
    }
  };
};

// Action to save the list of gallery
export const saveListGaleri = payload => {
  return {
    type: actionType.loadGaleri,
    payload: payload
  };
};
