import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import 'normalize-scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter basename="/country-app">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
