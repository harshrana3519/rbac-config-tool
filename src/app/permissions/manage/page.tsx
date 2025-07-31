'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Permission = {
  id: string
  name: string
}

export default function ManagePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [newPermission, setNewPermission] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const fetchPermissions = async () => {
    const { data, error } = await supabase.from('permissions').select('*')
    if (!error) setPermissions(data)
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  const handleCreate = async () => {
    if (!newPermission.trim()) return
    await supabase.from('permissions').insert([{ name: newPermission.trim() }])
    setNewPermission('')
    fetchPermissions()
  }

  const handleDelete = async (id: string) => {
    await supabase.from('permissions').delete().eq('id', id)
    fetchPermissions()
  }

  const handleEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditName(name)
  }

  const handleUpdate = async () => {
    if (!editName.trim() || !editingId) return
    await supabase.from('permissions').update({ name: editName.trim() }).eq('id', editingId)
    setEditingId(null)
    setEditName('')
    fetchPermissions()
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Permissions</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
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
          {permissions.map((perm) => (
            <tr key={perm.id}>
              <td className="p-2 border">
                {editingId === perm.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  perm.name
                )}
              </td>
              <td className="p-2 border space-x-2">
                {editingId === perm.id ? (
                  <button onClick={handleUpdate} className="text-green-600">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(perm.id, perm.name)} className="text-blue-600">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(perm.id)} className="text-red-600">
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
