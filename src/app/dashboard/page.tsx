'use client';

import { useState } from 'react';
import supabase from '@/lib/supabaseClient';

type Result = {
  role_name: string;
  permission_name: string;
};

export default function DashboardPage() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    console.log("Fetching for:", email);
    const { data, error } = await supabase.rpc("get_user_roles_permissions", {
      user_email: email.trim().toLowerCase(),
    });
    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      setError(error.message);
      setData([]);
    } else {
      setError(null);
      setData(data);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">RBAC Dashboard</h1>
      <p className="mb-6 text-gray-600">Check user roles and permissions</p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter user email"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={fetchPermissions}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Fetch Permissions
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {data.length > 0 && (
        <table className="min-w-full border border-gray-300 mt-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Permission</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td className="p-2 border">{item.role_name}</td>
                <td className="p-2 border">{item.permission_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}