import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

//Redux
import { Provider} from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './components/reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension'


//Route
import { BrowserRouter} from 'react-router-dom';

//Antd
import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));


const store = createStore(rootReducer, composeWithDevTools());

root.render(
  //<React.StrictMode>
 
    <Provider  store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  //</React.StrictMode>
);

