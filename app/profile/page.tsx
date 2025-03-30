'use client';

import { useUser } from '@stackframe/stack';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const user = useUser({ or: 'redirect' });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">프로필</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            {user.image && (
              <Image
                src={user.image}
                alt={user.displayName || '프로필 이미지'}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{user.displayName || '사용자'}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 