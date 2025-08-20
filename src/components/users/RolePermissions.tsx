import React, { useState } from 'react';
import { Shield, Users, Settings, BarChart3, FileText, Eye, Edit, Trash2 } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'accounts' | 'strategies' | 'reports' | 'users' | 'system';
}

interface RolePermission {
  role: string;
  permissions: string[];
}

const availablePermissions: Permission[] = [
  // Account permissions
  { id: 'view_accounts', name: 'View Accounts', description: 'View account details and information', category: 'accounts' },
  { id: 'edit_accounts', name: 'Edit Accounts', description: 'Modify account information and status', category: 'accounts' },
  { id: 'create_activities', name: 'Create Activities', description: 'Log collection activities and notes', category: 'accounts' },
  { id: 'assign_accounts', name: 'Assign Accounts', description: 'Assign accounts to collectors', category: 'accounts' },
  
  // Strategy permissions
  { id: 'view_strategies', name: 'View Strategies', description: 'View collection strategies', category: 'strategies' },
  { id: 'create_strategies', name: 'Create Strategies', description: 'Create new collection strategies', category: 'strategies' },
  { id: 'edit_strategies', name: 'Edit Strategies', description: 'Modify existing strategies', category: 'strategies' },
  { id: 'delete_strategies', name: 'Delete Strategies', description: 'Remove strategies from system', category: 'strategies' },
  
  // Report permissions
  { id: 'view_reports', name: 'View Reports', description: 'Access standard reports', category: 'reports' },
  { id: 'create_reports', name: 'Create Reports', description: 'Build custom reports', category: 'reports' },
  { id: 'export_reports', name: 'Export Reports', description: 'Export reports to various formats', category: 'reports' },
  { id: 'schedule_reports', name: 'Schedule Reports', description: 'Set up automated report generation', category: 'reports' },
  
  // User permissions
  { id: 'view_users', name: 'View Users', description: 'View user information', category: 'users' },
  { id: 'create_users', name: 'Create Users', description: 'Add new users to system', category: 'users' },
  { id: 'edit_users', name: 'Edit Users', description: 'Modify user information and roles', category: 'users' },
  { id: 'delete_users', name: 'Delete Users', description: 'Remove users from system', category: 'users' },
  
  // System permissions
  { id: 'system_config', name: 'System Configuration', description: 'Modify system settings', category: 'system' },
  { id: 'data_import', name: 'Data Import', description: 'Import and manage data files', category: 'system' },
  { id: 'audit_logs', name: 'Audit Logs', description: 'View system audit logs', category: 'system' },
  { id: 'backup_restore', name: 'Backup & Restore', description: 'Manage system backups', category: 'system' }
];

const defaultRolePermissions: RolePermission[] = [
  {
    role: 'admin',
    permissions: availablePermissions.map(p => p.id) // All permissions
  },
  {
    role: 'manager',
    permissions: [
      'view_accounts', 'edit_accounts', 'assign_accounts',
      'view_strategies', 'create_strategies', 'edit_strategies',
      'view_reports', 'create_reports', 'export_reports', 'schedule_reports',
      'view_users', 'create_users', 'edit_users',
      'data_import', 'audit_logs'
    ]
  },
  {
    role: 'supervisor',
    permissions: [
      'view_accounts', 'edit_accounts', 'create_activities',
      'view_strategies',
      'view_reports', 'export_reports',
      'view_users'
    ]
  },
  {
    role: 'collector',
    permissions: [
      'view_accounts', 'create_activities',
      'view_strategies',
      'view_reports'
    ]
  }
];

export function RolePermissions() {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(defaultRolePermissions);
  const [selectedRole, setSelectedRole] = useState<string>('collector');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accounts': return <Users className="w-5 h-5" />;
      case 'strategies': return <Settings className="w-5 h-5" />;
      case 'reports': return <BarChart3 className="w-5 h-5" />;
      case 'users': return <Shield className="w-5 h-5" />;
      case 'system': return <FileText className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'accounts': return 'text-blue-600 bg-blue-100';
      case 'strategies': return 'text-green-600 bg-green-100';
      case 'reports': return 'text-purple-600 bg-purple-100';
      case 'users': return 'text-red-600 bg-red-100';
      case 'system': return 'text-amber-600 bg-amber-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRolePermissions = (role: string) => {
    return rolePermissions.find(rp => rp.role === role)?.permissions || [];
  };

  const hasPermission = (role: string, permissionId: string) => {
    return getRolePermissions(role).includes(permissionId);
  };

  const togglePermission = (role: string, permissionId: string) => {
    setRolePermissions(prev => prev.map(rp => {
      if (rp.role === role) {
        const hasPermission = rp.permissions.includes(permissionId);
        return {
          ...rp,
          permissions: hasPermission
            ? rp.permissions.filter(p => p !== permissionId)
            : [...rp.permissions, permissionId]
        };
      }
      return rp;
    }));
  };

  const resetToDefaults = () => {
    setRolePermissions(defaultRolePermissions);
  };

  const saveChanges = () => {
    // In a real app, this would save to backend
    console.log('Saving role permissions:', rolePermissions);
    alert('Role permissions saved successfully!');
  };

  // Group permissions by category
  const permissionsByCategory = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
          <p className="text-gray-600 mt-1">Configure permissions for each user role</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Role to Configure</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['admin', 'manager', 'supervisor', 'collector'].map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                selectedRole === role
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Shield className={`w-5 h-5 ${selectedRole === role ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`font-medium capitalize ${selectedRole === role ? 'text-blue-900' : 'text-gray-900'}`}>
                  {role}
                </span>
              </div>
              <p className={`text-sm ${selectedRole === role ? 'text-blue-700' : 'text-gray-600'}`}>
                {getRolePermissions(role).length} permissions
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Permissions for {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </h3>
          <p className="text-gray-600 mt-1">
            Configure what this role can access and modify
          </p>
        </div>

        <div className="p-6 space-y-8">
          {Object.entries(permissionsByCategory).map(([category, permissions]) => (
            <div key={category}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 capitalize">
                  {category} Permissions
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions.map(permission => (
                  <div key={permission.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      id={`${selectedRole}-${permission.id}`}
                      checked={hasPermission(selectedRole, permission.id)}
                      onChange={() => togglePermission(selectedRole, permission.id)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`${selectedRole}-${permission.id}`}
                        className="font-medium text-gray-900 cursor-pointer"
                      >
                        {permission.name}
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['admin', 'manager', 'supervisor', 'collector'].map(role => (
            <div key={role} className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {getRolePermissions(role).length}
              </div>
              <div className="text-sm text-gray-600 capitalize">{role}</div>
              <div className="text-xs text-gray-500 mt-1">
                of {availablePermissions.length} permissions
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}