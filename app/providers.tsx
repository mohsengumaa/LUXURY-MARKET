'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <LocaleProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </LocaleProvider>
    </SessionProvider>
  );
}
