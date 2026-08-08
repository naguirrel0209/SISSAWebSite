import { useEffect, useState } from 'react';
import { getCurrentSession, onAuthStateChange } from '../services/adminSurveyService.js';
import { isSupabaseConfigured } from '../services/supabaseClient.js';

export function useAdminSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    getCurrentSession().then((currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      setLoading(false);
    });

    const subscription = onAuthStateChange((nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading, configured: isSupabaseConfigured };
}
