import { combineReducers } from 'redux';
import DisasterpieceReducer from './DisasterpieceReducer';

const AppReducer = combineReducers({
  dis: DisasterpieceReducer,
});

export default AppReducer;
