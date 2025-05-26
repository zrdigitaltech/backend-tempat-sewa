import { combineReducers } from 'redux';

// Import reducers yang diperlukan
import { kontrakanReducer } from '@/app/redux/reducer/kontrakan/reducer';
import { tipePropertiReducer } from '@/app/redux/reducer/tipeProperti/reducer';
import { tipeSewaReducer } from '@/app/redux/reducer/tipeSewa/reducer';
import { tipeKostReducer } from '@/app/redux/reducer/tipeKost/reducer';
import { tipeKamarReducer } from '@/app/redux/reducer/tipeKamar/reducer';

import { panduanReducer } from '@/app/redux/reducer/panduan/reducer';
import { authorReducer } from '@/app/redux/reducer/author/reducer';

import { hubungiPengiklanPropertiReducer } from '@/app/redux/reducer/hubungiPengiklanProperti/reducer';

// Combine semua reducers menjadi satu
const rootReducer = combineReducers({
  kontrakan: kontrakanReducer,
  tipeProperti: tipePropertiReducer,
  tipeSewa: tipeSewaReducer,
  tipeKost: tipeKostReducer,
  tipeKamar: tipeKamarReducer,

  panduan: panduanReducer,
  author: authorReducer,

  hubungiPengiklanProperti: hubungiPengiklanPropertiReducer
});

export default rootReducer;
