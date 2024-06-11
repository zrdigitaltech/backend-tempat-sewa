import { actionType } from '@/redux/action/banners/type';

// Data Json
import DataBanners from './data-banners.json';

// Read
export const getListBanners = () => {
  return dispatch => {
    return dispatch(saveListBanners(DataBanners));
  };
};

// Read
export const saveListBanners = payload => {
  return {
    type: actionType.loadBanners,
    payload: payload
  };
};
