import { actionType } from '@/redux/action/logos/type';

// Data Json
import DataLogos from './data-logos.json';

// Read
export const getListLogos = () => {
  return (dispatch) => {
    return dispatch(saveListLogos(DataLogos[0]));
  };
};

// Read
export const saveListLogos = (payload) => {
  return {
    type: actionType.loadLogos,
    payload: payload
  };
};
