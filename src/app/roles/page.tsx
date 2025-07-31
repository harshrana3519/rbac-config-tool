'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

type User = {
  id: string;
  email: string;
};

type Role = {
  id: string;
  name: string;
};

export default function AssignRolesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const { data: usersData } = await supabase.from('users').select('*');
      const { data: rolesData } = await supabase.from('roles').select('*');
      if (usersData) setUsers(usersData);
      if (rolesData) setRoles(rolesData);
    }
    fetchData();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUserId || !selectedRoleId) {
      setMessage('Please select both user and role.');
      return;
    }

    const { error } = await supabase.from('user_roles').insert([
      {
        user_id: selectedUserId,
        role_id: selectedRoleId,
      },
    ]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Role assigned successfully!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assign Role to User</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select User:</label>
        <select
          className="border p-2 w-full"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">-- Choose User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Role:</label>
        <select
          className="border p-2 w-full"
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(e.target.value)}
        >
          <option value="">-- Choose Role --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAssignRole}
      >
        Assign Role
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
