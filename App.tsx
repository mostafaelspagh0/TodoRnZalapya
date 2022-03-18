import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/main.navigaitor'

function App() {
  return <MainNavigator/>
}

const main = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  )
}

export default main
