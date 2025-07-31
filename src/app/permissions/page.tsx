'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

type Role = {
  id: string;
  name: string;
};

type Permission = {
  id: string;
  name: string;
};

export default function AssignPermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [selectedPermissionId, setSelectedPermissionId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const { data: roleData } = await supabase.from('roles').select('*');
      const { data: permissionData } = await supabase.from('permissions').select('*');
      if (roleData) setRoles(roleData);
      if (permissionData) setPermissions(permissionData);
    }
    fetchData();
  }, []);

  const handleAssignPermission = async () => {
    if (!selectedRoleId || !selectedPermissionId) {
      setMessage('Please select both role and permission.');
      return;
    }

    const { error } = await supabase.from('role_permissions').insert([
      {
        role_id: selectedRoleId,
        permission_id: selectedPermissionId,
      },
    ]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Permission assigned successfully!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assign Permission to Role</h1>

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

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Permission:</label>
        <select
          className="border p-2 w-full"
          value={selectedPermissionId}
          onChange={(e) => setSelectedPermissionId(e.target.value)}
        >
          <option value="">-- Choose Permission --</option>
          {permissions.map((permission) => (
            <option key={permission.id} value={permission.id}>
              {permission.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAssignPermission}
      >
        Assign Permission
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
