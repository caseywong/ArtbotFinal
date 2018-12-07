import { combineReducers } from 'redux';
import DisasterpieceReducer from './DisasterpieceReducer';

const AppReducer = combineReducers({
  pieces: DisasterpieceReducer
});

export default AppReducer;
