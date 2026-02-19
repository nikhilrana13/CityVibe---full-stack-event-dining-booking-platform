import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Persistor, Store } from './redux/Store'
import { PersistGate } from 'redux-persist/es/integration/react'

createRoot(document.getElementById('root')).render(

   <Provider store={Store}>
     <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </PersistGate>
   </Provider>
 
)
