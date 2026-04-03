import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import UserProfile from './components/UserProfile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProfile/>
  </StrictMode>,
)
