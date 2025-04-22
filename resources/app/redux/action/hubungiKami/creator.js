import { actionType } from '@/app/redux/action/hubungiKami/type';
import axios from 'axios';

// Data Json
import DataHubungiKami from './data-hubungi-kami.json';

// Read
export const getListHubungiKami = () => {
  return async dispatch => {
    try {
      // const response = await axios.get('/api/v1/contact-us');
      // const dataHubungiKami = response?.data?.data;
      // if (dataHubungiKami?.length > 0) {
      //   dispatch(saveListHubungiKami(dataHubungiKami[0]));
      // } else {
      //   dispatch(saveListHubungiKami(DataHubungiKami[0]));
      // }
      dispatch(saveListHubungiKami(DataHubungiKami[0]));
    } catch (error) {
      console.error('Error fetching hubungi kami from API:', error);
      dispatch(saveListHubungiKami(DataHubungiKami[0]));
    }
  };
};

// Action to save the list of hubungi kami
export const saveListHubungiKami = payload => {
  return {
    type: actionType.loadHubungiKami,
    payload: payload
  };
};
