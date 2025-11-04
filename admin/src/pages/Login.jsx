import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormInput, CButton } from '@coreui/react'

export default function Login() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Vite exposes env vars via import.meta.env.VITE_*
  const ADMIN_PIN = (import.meta && import.meta.env && import.meta.env.VITE_ADMIN_PIN) || '1234'

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      localStorage.setItem('adminAuth', 'true')
      navigate('/')
    } else {
      setError('Invalid PIN')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
      <CCard style={{ width: 420 }}>
        <CCardBody>
          <h4>Admin access</h4>
          <p>Enter your admin passcode to continue to the dashboard.</p>
          <CForm onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <CFormInput
              type="password"
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <CButton type="submit">Enter</CButton>
          </CForm>
          {error && <div style={{ marginTop: 12, color: 'red' }}>{error}</div>}
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            Hint: default PIN is <strong>1234</strong> (change with VITE_ADMIN_PIN)
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}
