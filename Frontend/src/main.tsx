import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "next-themes"
import { HelmetProvider } from "react-helmet-async"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                <App />
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>,
)

