import { actionType } from '@/app/redux/action/author/type';
import axios from 'axios';

// Data Json
import DataAuthor from './data-author.json';

// Read
export const getListAuthor = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/author');
      const dataAuthor = response?.data?.data;
      if (dataAuthor?.length > 0) {
        dispatch(saveListAuthor(dataAuthor));
      } else {
        dispatch(saveListAuthor(DataAuthor));
      }
    } catch (error) {
      console.error('Error fetching author from API:', error);
      dispatch(saveListAuthor(DataAuthor));
    }
  };
};

export const saveListAuthor = payload => {
  return {
    type: actionType.loadAuthor,
    payload: payload
  };
};
