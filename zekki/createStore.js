import {createStore} from 'redux';
import reducers from './reducers/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const initialState = {
  alarms: [],
  nfcs: [],
  defaultAlarm: {},
};

const persistConfig = {
  key: 'zekki',
  storage: AsyncStorage,
};

const _persistReducer = persistReducer(persistConfig, reducers);
const store = createStore(_persistReducer, initialState);

const persistor = persistStore(store);
export {store, persistor};
