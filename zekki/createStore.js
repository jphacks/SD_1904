import {createStore} from 'redux';
import reducers from './reducers/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const initialState = {
  alarms: [],
  activeAlarms: [],
  nfcs: [],
  defaultAlarm: {
    hour: 9,
    minutes: 0,
    days: [true, true, true, true, true, true, true],
    soundName: 'trumpet1',
    sound: './trumpet1.mp3',
    tweet: 'hello world',
    difficulty: 0,
    isActive: false,
  },
  isRinging: {
    isRinging: false,
    isRestarted: false,
    alarmID: null,
  },
};

const persistConfig = {
  key: 'zekki',
  storage: AsyncStorage,
};

const _persistReducer = persistReducer(persistConfig, reducers);
const store = createStore(_persistReducer, initialState);

const persistor = persistStore(store);

export {store, persistor};
