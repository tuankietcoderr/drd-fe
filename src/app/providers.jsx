'use client';

import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Toaster} from 'sonner';
import StoreProvider from './store-provider';

const Providers = ({children}) => {
  return (
    <StoreProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              marginTop: '3rem',
            },
          }}
        />
      </NextThemesProvider>
    </StoreProvider>
  );
};

export default Providers;
