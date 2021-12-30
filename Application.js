import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import App from './App';


export default class Application extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <App></App>
      </Provider>
    );
  }
}