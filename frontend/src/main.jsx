import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Persistor, Store } from './redux/Store'
import { PersistGate } from 'redux-persist/es/integration/react'
import ErrorBoundary from './components/common/ErrorBoundary'
import { LocationProvider } from './context/useLocationContext'
import { SearchProvider } from './context/useSearchContext'
import { DialogProvider } from './context/useDialog'

createRoot(document.getElementById('root')).render(
  
     <Provider store={Store}>
     <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
        <ErrorBoundary>
         <LocationProvider>
            <SearchProvider>
               <DialogProvider>
                  <App />
               </DialogProvider>
            
            </SearchProvider>     
         </LocationProvider>
        </ErrorBoundary>
        
        </BrowserRouter>
     </PersistGate>
   </Provider>
  
  
 
)
