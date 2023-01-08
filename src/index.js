import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
