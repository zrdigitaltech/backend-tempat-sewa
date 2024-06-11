import { actionType } from '@/redux/action/galeri/type';

// Data Json
import DataGaleri from './data-galeri.json';

// Read
export const getListGaleri = () => {
  return (dispatch) => {
    return dispatch(saveListGaleri(DataGaleri));
  };
};

// Read
export const saveListGaleri = (payload) => {
  return {
    type: actionType.loadGaleri,
    payload: payload
  };
};
