import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducer'; // Assuming you have your root reducer defined

const store = configureStore({
  reducer: rootReducer
});

export default store;
