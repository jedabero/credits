import { combineReducers } from '@reduxjs/toolkit';
import creditCards from './creditCards';
import movements from './movements';

export default combineReducers({
  creditCards,
  movements,
});
