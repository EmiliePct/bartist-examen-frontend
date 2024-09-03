import '../styles/globals.css';
import Head from 'next/head';

import { persistStore, persistReducer } from "redux-persist";
// import { createMigrate } from 'redux-persist';
// import { migrations } from "../reducers/numberOfChange"
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";

//Imports pour pouvoir utiliser les calendriers dans tout le site
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/fr' //Pour mettre les heures et dates au format GB similaire à FR

import { Provider } from "react-redux";

const persistConfig = { 
  key: "bartist-examen", 
  storage,
  // version: 1, // Assurez-vous que cette version est bien supérieure à 0
  // migrate: createMigrate(migrations, { debug: true }),
};

const reducers = combineReducers({ user });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Optionnel: Purger pour forcer la réinitialisation
// persistor.purge();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
          <Head>
            <title>BarTist</title>
          </Head>
          <Component {...pageProps} />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
