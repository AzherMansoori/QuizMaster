import { combineReducers } from '@reduxjs/toolkit';
import categorySlice from './slice/categorySlice';


export default combineReducers({
  category: categorySlice,
});
