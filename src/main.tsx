import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { StoreProvider } from './store/StoreContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </HashRouter>
    </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
