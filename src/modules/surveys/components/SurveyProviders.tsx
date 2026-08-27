import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AppDataProvider } from '@/contexts/AppDataContext';

export function SurveyProviders({ children }: { children: ReactNode }) {
  return (
    <div className="survey-portal">
      <AppDataProvider>
        {children}
        <Toaster richColors position="top-right" />
      </AppDataProvider>
    </div>
  );
}
