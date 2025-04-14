'use client';

import {ThemeProvider as NextThemesProvider} from 'next-themes';

const Providers = ({children}) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
};

export default Providers;
