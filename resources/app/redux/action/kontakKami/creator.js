import { actionType } from '@/redux/action/kontakKami/type';

// Data Json
import DataKontakKami from './data-kontak-kami.json';

// Read
export const getListKontakKami = () => {
  return (dispatch) => {
    return dispatch(saveListKontakKami(DataKontakKami[0]));
  };
};

// Read
export const saveListKontakKami = (payload) => {
  return {
    type: actionType.loadKontakKami,
    payload: payload
  };
};
