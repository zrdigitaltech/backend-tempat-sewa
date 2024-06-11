import { actionType } from '@/redux/action/timKami/type';

// Data Json
import DataTimKami from './data-tim-kami.json';

// Read
export const getListTimKami = () => {
  return (dispatch) => {
    return dispatch(saveListTimKami(DataTimKami));
  };
};

// Read
export const saveListTimKami = (payload) => {
  return {
    type: actionType.loadTimKami,
    payload: payload
  };
};
