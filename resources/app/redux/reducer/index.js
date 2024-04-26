import { combineReducers } from 'redux';

// Import reducers yang diperlukan
import { logosReducer } from '@/redux/reducer/logos/reducer';
import { hubungiKamiReducer } from '@/redux/reducer/hubungiKami/reducer';
import { floatingWhatsappReducer } from '@/redux/reducer/floatingWhatsapp/reducer';
import { pembayaranReducer } from '@/redux/reducer/pembayaran/reducer';
import { kontrakanReducer } from '@/redux/reducer/kontrakan/reducer';

// Combine semua reducers menjadi satu
const rootReducer = combineReducers({
  logos: logosReducer,
  hubungiKami: hubungiKamiReducer,
  pembayaran: pembayaranReducer,
  kontrakan: kontrakanReducer,
  floatingWhatsapp: floatingWhatsappReducer
});

export default rootReducer;
