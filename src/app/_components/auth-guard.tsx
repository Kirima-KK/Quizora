'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import serverConfig from '../_config/server.config';
import { Spinner } from '@heroui/react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${serverConfig.backendHost}/api/current-user`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          setAuthorized(true);
          setLoading(false);
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  // During Prerendering (Build), this will return null, preventing the crash
  if (loading) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Spinner size="xl" className='text-[var(--theme-blue)]' />
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}