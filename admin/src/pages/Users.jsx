import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react'

  // Vite exposes env vars on import.meta.env and Vite-specific vars should start with VITE_
  const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000'
  const GRAPHQL = `${API}/graphql`

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch(GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ tenants { id name } }' }),
      })
      // retrieve default tenant id then query users for that tenant
      const tenantsResp = await res.json()
      const tenant = (tenantsResp.data && tenantsResp.data.tenants && tenantsResp.data.tenants[0]) || null
      if (!tenant) {
        setUsers([])
        setLoading(false)
        return
      }
      const q = `query ($t:String!) { users(tenantId: $t) { id name email } }`
      const usersRes = await fetch(GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, variables: { t: tenant.id } }),
      })
      const usersJson = await usersRes.json()
      setUsers(usersJson.data.users || [])
    } catch (err) {
      console.error('Failed to fetch users', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!name) return
    try {
      // create user via GraphQL mutation; using tenant 0th tenant from tenants query
      const tenantsRes = await fetch(GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ tenants { id name } }' }),
      })
      const tenantsJson = await tenantsRes.json()
      const tenant = tenantsJson.data.tenants[0]
      if (!tenant) return
      const mutation = `mutation ($t:ID!, $n:String!) { registerUser(tenantId: $t, name: $n) { id name } }`
      const res = await fetch(GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables: { t: tenant.id, n: name } }),
      })
      const json = await res.json()
      if (json.data && json.data.registerUser) {
        setName('')
        fetchUsers()
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id) {
    try {
      const mutation = `mutation ($id: ID!) { deleteUser(id: $id) }`
      const res = await fetch(GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables: { id } }),
      })
      const json = await res.json()
      if (json.data && json.data.deleteUser) fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h3>Users</h3>

      <CForm onSubmit={handleAdd} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <CFormInput placeholder="New user name" value={name} onChange={(e) => setName(e.target.value)} />
        <CButton type="submit">Add</CButton>
      </CForm>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((u) => (
              <CTableRow key={u.id}>
                <CTableDataCell>{u.id}</CTableDataCell>
                <CTableDataCell>{u.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(u.id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}
