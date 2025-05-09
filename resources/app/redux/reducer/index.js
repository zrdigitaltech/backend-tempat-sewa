import { combineReducers } from 'redux';

// Import reducers yang diperlukan
import { logosReducer } from '@/app/redux/reducer/logos/reducer';
import { hubungiKamiReducer } from '@/app/redux/reducer/hubungiKami/reducer';
import { floatingWhatsappReducer } from '@/app/redux/reducer/floatingWhatsapp/reducer';
import { pembayaranReducer } from '@/app/redux/reducer/pembayaran/reducer';
import { kontrakanReducer } from '@/app/redux/reducer/kontrakan/reducer';
import { tipePropertiReducer } from '@/app/redux/reducer/tipeProperti/reducer';
import { tipeSewaReducer } from '@/app/redux/reducer/tipeSewa/reducer';
import { tipeKostReducer } from '@/app/redux/reducer/tipeKost/reducer';
import { tipeKamarReducer } from '@/app/redux/reducer/tipeKamar/reducer';

// Combine semua reducers menjadi satu
const rootReducer = combineReducers({
  logos: logosReducer,
  hubungiKami: hubungiKamiReducer,
  pembayaran: pembayaranReducer,
  kontrakan: kontrakanReducer,
  tipeProperti: tipePropertiReducer,
  tipeSewa: tipeSewaReducer,
  tipeKost: tipeKostReducer,
  tipeKamar: tipeKamarReducer,
  floatingWhatsapp: floatingWhatsappReducer
});

export default rootReducer;
