import { actionType } from '@/app/redux/action/interior/type';
import axios from 'axios';

// Data Json
import DataInterior from './data-interior.json';

// Read
export const getListInterior = () => {
  return async dispatch => {
    try {
      const response = await axios?.get('/api/v1/interior');
      const dataInterior = response?.data?.data;
      if (dataInterior?.length > 0) {
        dispatch(saveListInterior(dataInterior));
      } else {
        dispatch(saveListInterior(DataInterior));
      }
    } catch (error) {
      console.error('Error fetching Interior from API:', error);
      dispatch(saveListInterior(DataInterior));
    }
  };
};

export const saveListInterior = payload => {
  return {
    type: actionType.loadInterior,
    payload: payload
  };
};
