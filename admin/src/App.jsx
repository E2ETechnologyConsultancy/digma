import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CSidebar,
  CSidebarNav,
  CButton,
  CNavItem,
  CNavLink
} from '@coreui/react'

import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Login from './pages/Login'

export default function App() {
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setAuth(localStorage.getItem('adminAuth') === 'true')
  }, [])

  function handleLogout() {
    localStorage.removeItem('adminAuth')
    setAuth(false)
    navigate('/')
  }

  if (!auth) {
    // If not authenticated, only show login route
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <CHeader position="sticky" className="mb-4" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <CHeaderBrand href="#" style={{ fontWeight: 600, fontSize: 22 }}>Admin Dashboard</CHeaderBrand>
        <div style={{ float: 'right', marginRight: 12 }}>
          <CButton color="secondary" size="sm" onClick={handleLogout}>Logout</CButton>
        </div>
      </CHeader>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        <CSidebar style={{ width: 220, background: '#fff', borderRight: '1px solid #e3e5e8', paddingTop: 12 }}>
          <CSidebarNav>
            <CNavItem>
              <CNavLink component={Link} to="/">Dashboard</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink component={Link} to="/users">Users</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink component={Link} to="/settings">Settings</CNavLink>
            </CNavItem>
          </CSidebarNav>
        </CSidebar>

        <CContainer style={{ padding: 32, maxWidth: '100%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </CContainer>
      </div>
    </div>
  )
}
