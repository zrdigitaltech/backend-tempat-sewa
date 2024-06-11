import { actionType } from '@/redux/action/areaLayanan/type';

// Data Json
import DataAreaLayanan from './data-area-layanan.json';

// Read
export const getListAreaLayanan = () => {
  return (dispatch) => {
    return dispatch(saveListAreaLayanan(DataAreaLayanan));
  };
};

// Read
export const saveListAreaLayanan = (payload) => {
  return {
    type: actionType.loadAreaLayanan,
    payload: payload
  };
};
