'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser } from '../_lib/users';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // This fetch MUST have credentials: 'include'
        const user = await fetchCurrentUser();

        if (!user) {
          router.push('/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}