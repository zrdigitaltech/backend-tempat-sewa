import { actionType } from '@/redux/action/layanan/type';

// Data Json
import DataLayanan from './data-layanan.json';

// Read
export const getListLayanan = () => {
  return dispatch => {
    return dispatch(saveListLayanan(DataLayanan));
  };
};

// Read
export const saveListLayanan = payload => {
  return {
    type: actionType.loadLayanan,
    payload: payload
  };
};
