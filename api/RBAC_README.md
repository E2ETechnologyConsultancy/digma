# Role-Based Access Control (RBAC) System

This document describes the RBAC system implemented for the DigMa application.

## Overview

The RBAC system provides fine-grained access control with roles, permissions, and tenant isolation. It supports multi-tenant architecture where users can have different roles within different tenants.

## Database Models

### Role
- **name**: Unique role identifier (e.g., 'super_admin', 'tenant_admin')
- **description**: Human-readable description
- **isSystemRole**: Whether this is a built-in system role (cannot be deleted)

### Permission
- **resource**: The resource being protected (e.g., 'user', 'tenant', 'metric')
- **action**: The action being performed (e.g., 'create', 'read', 'update', 'delete')
- **description**: Human-readable description

### RolePermission
- Many-to-many relationship between roles and permissions

### UserRole
- **user**: Reference to User
- **role**: Reference to Role
- **tenant**: Reference to Tenant (null for system-wide roles)
- **assignedBy**: Who assigned this role
- **assignedAt**: When the role was assigned
- **expiresAt**: Optional expiration date
- **isActive**: Whether this role assignment is active

## Built-in Roles

### super_admin
**Description**: Super administrator with full system access
**Permissions**:
- All tenant operations (create, read, update, delete)
- All user operations (create, read, update, delete)
- All metric operations (create, read, update, delete)
- All role operations (assign, read, manage)
- System administration

### tenant_admin
**Description**: Tenant administrator with full access to their tenant
**Permissions**:
- Read/update their tenant
- All user operations within their tenant
- All metric operations within their tenant
- Assign roles within their tenant

### tenant_user
**Description**: Regular tenant user with read-only access
**Permissions**:
- Read their tenant
- Read users within their tenant
- Read metrics within their tenant

## Permission Structure

Permissions follow the format: `resource:action`

### Available Permissions

**Tenant Permissions:**
- `tenant:create` - Create new tenants
- `tenant:read` - View tenant information
- `tenant:update` - Update tenant settings
- `tenant:delete` - Delete tenants

**User Permissions:**
- `user:create` - Create new users
- `user:read` - View user information
- `user:update` - Update user information
- `user:delete` - Delete users

**Metric Permissions:**
- `metric:create` - Create metrics
- `metric:read` - View metrics
- `metric:update` - Update metrics
- `metric:delete` - Delete metrics

**Role Permissions:**
- `role:assign` - Assign roles to users
- `role:read` - View roles and permissions
- `role:manage` - Create and manage roles

**System Permissions:**
- `system:admin` - Full system administration

## Middleware

### requirePermission(resource, action, options)
Checks if the authenticated user has the specified permission.

**Options:**
- `allowSystemAdmin`: Allow system admin to bypass (default: false)
- `requireTenantMatch`: Ensure user belongs to the same tenant (default: false)

### requireRole(roleNames, options)
Checks if the user has any of the specified roles.

### requireTenantAccess
Ensures users can only access resources within their tenant (unless system admin).

## API Usage Examples

### Protecting Routes

```javascript
const { requirePermission, requireRole } = require('./middlewares/rbac')

// Require user:create permission
router.post('/users', requirePermission('user', 'create'), createUser)

// Require tenant_admin or super_admin role
router.get('/admin', requireRole(['tenant_admin'], { allowSystemAdmin: true }), adminDashboard)

// All routes in this router require tenant access control
router.use(requireTenantAccess)
```

### Checking Permissions in Code

```javascript
// Check if user has permission
const canCreateUsers = await user.hasPermission('user', 'create', tenantId)

// Check if user has role
const isAdmin = await user.hasRole('tenant_admin', tenantId)

// Get all user permissions
const permissions = await user.getPermissions(tenantId)
```

## Migration

To set up the RBAC system, run the migration:

```bash
cd api
node run_rbac_migration.js up
```

This will:
1. Create all permissions
2. Create built-in roles and assign permissions
3. Assign appropriate roles to existing users
4. Create a system administrator user

## Security Considerations

1. **Tenant Isolation**: Users can only access resources within their tenant unless they have system-wide roles
2. **Role Expiration**: Roles can have expiration dates for temporary access
3. **Audit Trail**: All role assignments are tracked with `assignedBy` and `assignedAt`
4. **System Roles**: Built-in roles cannot be deleted to prevent accidental removal
5. **Permission Granularity**: Fine-grained permissions allow precise access control

## Future Enhancements

- Role hierarchies (inheritance)
- Permission groups
- Time-based permissions
- Resource-specific permissions (e.g., access to specific users only)
- Permission caching for performance