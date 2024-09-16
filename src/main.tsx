import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme or use your custom theme
import 'primereact/resources/primereact.min.css';         // PrimeReact core CSS
import 'primeicons/primeicons.css';                       // PrimeIcons
import './index.css';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000} style={{
        fontSize: '1rem'
      }}
    >
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
