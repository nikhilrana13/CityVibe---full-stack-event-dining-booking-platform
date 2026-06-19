import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Persistor,Store} from './redux/Store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PersistGate>
    </Provider>
)
