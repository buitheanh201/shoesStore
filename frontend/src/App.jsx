import React from 'react';
import RootRoute from './routes'
import { Provider } from 'react-redux';
import store from './store'; 

function App() {
    return (
        <Provider store = {store}>
            <RootRoute />
        </Provider>
    )
}

export default App;