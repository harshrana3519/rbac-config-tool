'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Role = {
  id: string
  name: string
}

export default function ManageRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [newRole, setNewRole] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const fetchRoles = async () => {
    const { data, error } = await supabase.from('roles').select('*')
    if (!error) setRoles(data)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleCreate = async () => {
    if (!newRole.trim()) return
    await supabase.from('roles').insert([{ name: newRole.trim() }])
    setNewRole('')
    fetchRoles()
  }

  const handleDelete = async (id: string) => {
    await supabase.from('roles').delete().eq('id', id)
    fetchRoles()
  }

  const handleEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditName(name)
  }

  const handleUpdate = async () => {
    if (!editName.trim() || !editingId) return
    await supabase.from('roles').update({ name: editName.trim() }).eq('id', editingId)
    setEditingId(null)
    setEditName('')
    fetchRoles()
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Roles</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="p-2 border">
                {editingId === role.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td className="p-2 border space-x-2">
                {editingId === role.id ? (
                  <button onClick={handleUpdate} className="text-green-600">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(role.id, role.name)} className="text-blue-600">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(role.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
