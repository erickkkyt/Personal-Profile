'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type UserInfo = {
  email: string;
};

type Variant = 'dark' | 'light';

export default function UserBadge({ variant = 'dark' }: { variant?: Variant }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({ email: data.user.email || '' });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (!user) return null;

  const initial = user.email?.[0]?.toUpperCase() || 'U';
  const emailHandle = user.email?.split('@')[0] || '';
  const displayEmail =
    emailHandle.length > 12 ? `${emailHandle.slice(0, 12)}...` : emailHandle;

  const styles =
    variant === 'light'
      ? {
          container:
            'bg-gray-100 border border-gray-200 text-gray-900 shadow-sm',
          badge:
            'bg-primary/90 text-white',
          email: 'text-gray-700',
          button:
            'text-[11px] font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary px-2 py-0.5 rounded-full transition-colors border border-primary/40',
        }
      : {
          container:
            'bg-white/10 border border-white/20 text-white shadow-sm',
          badge:
            'bg-primary/80 text-white',
          email: 'text-white/80',
          button:
            'text-[11px] font-semibold text-primary-foreground bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded-full transition-colors border border-white/30',
        };

  return (
    <div className={`flex items-center gap-2 rounded-full px-2 py-1 ${styles.container}`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${styles.badge}`}>
        {initial}
      </div>
      <div className={`text-xs font-semibold max-w-[120px] truncate ${styles.email}`}>
        {displayEmail}
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className={styles.button}
      >
        退出
      </button>
    </div>
  );
}
