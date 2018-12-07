import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './App/Reducers/AppReducer';
import AppWithNavigationState from './App/Components/AppNavigator';

class ArtBotApp extends React.Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
          <AppWithNavigationState />
      </Provider>
    );
  }
}

export default ArtBotApp;
