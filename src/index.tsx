import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import userStore from "./store/userStore";
import ContactsStore from "./store/ContactsStore";
import {IContext} from "./types/contextTypes";
import ServiceStore from "./store/serviceStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context = createContext<IContext | null>(null)


root.render(
  <React.StrictMode>
      <Context.Provider value={{
          user: new userStore(),
          contacts: new ContactsStore(),
          service: new ServiceStore(),
      }}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);


reportWebVitals();
