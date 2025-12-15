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

  const styles =
    variant === 'light'
      ? {
          container:
            'bg-gray-100 border border-gray-200 text-gray-900 shadow-sm',
          badge:
            'bg-primary/90 text-white',
          email: 'text-gray-700',
          status: 'text-gray-800',
          button:
            'text-xs font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary px-2.5 py-1 rounded-full transition-colors border border-primary/40',
        }
      : {
          container:
            'bg-white/10 border border-white/20 text-white shadow-sm',
          badge:
            'bg-primary/80 text-white',
          email: 'text-white/80',
          status: 'text-white',
          button:
            'text-xs font-semibold text-primary-foreground bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors border border-white/30',
        };

  return (
    <div className={`flex items-center gap-3 rounded-full px-3 py-1.5 ${styles.container}`}>
      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-semibold ${styles.badge}`}>
        {initial}
      </div>
      <div className="leading-tight text-sm max-w-[180px]">
        <div className={`font-semibold ${styles.status}`}>已登录</div>
        <div className={`truncate ${styles.email}`}>{user.email}</div>
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
