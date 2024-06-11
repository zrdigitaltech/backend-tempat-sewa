import { actionType } from '@/redux/action/pembayaran/type';

// Data Json
import DataPembayaran from './data-pembayaran.json';

// Read
export const getListPembayaran = () => {
  return (dispatch) => {
    return dispatch(saveListPembayaran(DataPembayaran));
  };
};

// Read
export const saveListPembayaran = (payload) => {
  return {
    type: actionType.loadPembayaran,
    payload: payload
  };
};
