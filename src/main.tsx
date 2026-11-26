import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/App';
import LanguageProvider from 'src/Components/LanguageProvider/LanguageProvider';

import './index.css';

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <StrictMode>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </StrictMode>,
    );
}
