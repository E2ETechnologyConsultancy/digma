import React from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'

export default function Dashboard() {
  return (
    <div>
      <h3 style={{ marginBottom: 24 }}>Dashboard</h3>
      <CRow className="mb-4">
        <CCol xs={12} md={4}>
          <CCard color="primary" textColor="white" className="mb-4">
            <CCardBody>
              <div style={{ fontSize: 32, fontWeight: 700 }}>1,234</div>
              <div>Users</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard color="success" textColor="white" className="mb-4">
            <CCardBody>
              <div style={{ fontSize: 32, fontWeight: 700 }}>$12,345</div>
              <div>Revenue</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard color="info" textColor="white" className="mb-4">
            <CCardBody>
              <div style={{ fontSize: 32, fontWeight: 700 }}>567</div>
              <div>Active Sessions</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <p>Welcome to the admin dashboard. This is a CoreUI template placeholder. You can add charts, tables, and more widgets here.</p>
        </CCardBody>
      </CCard>
    </div>
  )
}
