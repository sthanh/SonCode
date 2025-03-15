'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Dashboard
          </h1>
          <p className="text-center">Please log in to view your dashboard.</p>
          <div className="flex justify-center mt-4">
            <Link href="/login">
              <div className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Login
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Dashboard
        </h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Saved Trials</h2>
            {/* TODO: Display saved trials */}
            <p>Coming soon...</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Medical Profile</h2>
            {/* TODO: Link to profile editing page */}
            <Link href="/profile">
              <div  className="text-blue-500 hover:underline" >Edit Profile</div>
            </Link>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Chat History</h2>
            {/* TODO: Display chat history */}
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}