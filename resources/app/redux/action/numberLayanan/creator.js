import { actionType } from '@/redux/action/numberLayanan/type';
import axios from 'axios';

// Data Json
import DataNumberLayanan from './data-number-layanan.json';

// Read
export const getListNumberLayanan = () => {
  return dispatch => {
    return dispatch(saveListNumberLayanan(DataNumberLayanan[0]));
  };
};

// Read
export const saveListNumberLayanan = payload => {
  return {
    type: actionType.loadNumberLayanan,
    payload: payload
  };
};
