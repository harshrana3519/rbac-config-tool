'use client';

import { useState } from 'react';

export default function EmailInput({
  onFetch,
}: {
  onFetch: (email: string) => void;
}) {
  const [email, setEmail] = useState('');

  const handleFetch = () => {
    onFetch(email.trim().toLowerCase());
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <input
        type="email"
        placeholder="Enter user email"
        className="border p-2 mb-4 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch
      </button>
    </div>
  );
}
