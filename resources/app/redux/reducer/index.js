import { combineReducers } from 'redux';

// Import reducers yang diperlukan
import { testimoniReducer } from '@/redux/reducer/testimoni/reducer';
import { kontakKamiReducer } from '@/redux/reducer/kontakKami/reducer';
import { floatingWhatsappReducer } from '@/redux/reducer/floatingWhatsapp/reducer';
import { pembayaranReducer } from '@/redux/reducer/pembayaran/reducer';
import { galeriReducer } from '@/redux/reducer/galeri/reducer';

// Combine semua reducers menjadi satu
const rootReducer = combineReducers({
  testimoni: testimoniReducer,
  kontakKami: kontakKamiReducer,
  pembayaran: pembayaranReducer,
  galeri: galeriReducer,
  floatingWhatsapp: floatingWhatsappReducer
});

export default rootReducer;
