import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from '@states/store';
import Navigation from '@navigation/Navigation';
import '@unistyles/unistyles';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
