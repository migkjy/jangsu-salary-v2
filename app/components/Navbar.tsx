'use client';

import { UserButton } from '@stackframe/stack';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            장수
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              소개
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              서비스
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              문의
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
} 