import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Google Analytics
window.dataLayer = window.dataLayer || []
function gtag() {
  window.dataLayer.push(arguments)
}
window.gtag = gtag
gtag('js', new Date())
gtag('config', 'GA_MEASUREMENT_ID')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
