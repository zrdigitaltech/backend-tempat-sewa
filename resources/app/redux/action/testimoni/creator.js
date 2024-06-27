import { actionType } from '@/redux/action/testimoni/type';
import axios from 'axios';

// Data Json
import DataTestimoni from './data-testimoni.json';

// Read
export const getListTestimoni = () => {
  return dispatch => {
    return dispatch(saveListTestimoni(DataTestimoni));
  };
};

// Read
export const saveListTestimoni = payload => {
  return {
    type: actionType.loadTestimoni,
    payload: payload
  };
};
