import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/App';
import DialogsProvider from 'src/Components/Dialog/DialogsProvider';
import LanguageProvider from 'src/Components/LanguageProvider/LanguageProvider';

import './index.css';

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <StrictMode>
            <LanguageProvider>
                <DialogsProvider>
                    <App />
                </DialogsProvider>
            </LanguageProvider>
        </StrictMode>,
    );
}
