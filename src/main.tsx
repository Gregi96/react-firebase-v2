import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'outstated'
import { useAuthStore as authStore } from 'lib/stores'
import { App } from './app'
import './index.css'
import './reset.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider stores={[authStore]}>
        <App />
    </Provider>
)
