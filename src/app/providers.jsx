'use client';

import {ThemeProvider as NextThemesProvider} from 'next-themes';
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
      </NextThemesProvider>
    </StoreProvider>
  );
};

export default Providers;
