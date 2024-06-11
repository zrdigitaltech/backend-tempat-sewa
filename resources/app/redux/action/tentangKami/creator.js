import { actionType } from '@/redux/action/tentangKami/type';

// Data Json
import DataTentangKami from './data-tentang-kami.json';

// Read
export const getListTentangKami = () => {
  return dispatch => {
    return dispatch(saveListTentangKami(DataTentangKami[0]));
  };
};

// Read
export const saveListTentangKami = payload => {
  return {
    type: actionType.loadTentangKami,
    payload: payload
  };
};
