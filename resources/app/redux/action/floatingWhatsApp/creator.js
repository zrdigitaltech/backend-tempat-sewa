import { actionType } from '@/app/redux/action/floatingWhatsapp/type';
import axios from 'axios';

// Data Json
import DataFloatingWhatsapp from './data-floating-whatsapp.json';

// Read
export const getListFloatingWhatsapp = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/floating-whatsapp');
      const dataFloatingWhatsapp = response?.data?.data;
      if (dataFloatingWhatsapp?.length > 0) {
        dispatch(saveListFloatingWhatsapp(dataFloatingWhatsapp[0]));
      } else {
        dispatch(saveListFloatingWhatsapp(DataFloatingWhatsapp[0]));
      }
    } catch (error) {
      console.error('Error fetching floating whatsapp from API:', error);
      dispatch(saveListFloatingWhatsapp(DataFloatingWhatsapp[0]));
    }
  };
};

// Action to save the list of floating whatsapp
export const saveListFloatingWhatsapp = payload => {
  return {
    type: actionType.loadFloatingWhatsapp,
    payload: payload
  };
};
