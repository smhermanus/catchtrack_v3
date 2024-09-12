// Type Imports
import type { PermissionRowType } from '@/types/apps/permissionTypes'

export const db: PermissionRowType[] = [
  {
    id: 1,
    name: 'Management',
    assignedTo: 'administrator',
    createdDate: '14 Apr 2024, 8:43 PM'
  },
  {
    id: 2,
    assignedTo: 'administrator',
    name: 'Manage Billing & Roles',
    createdDate: '16 May 2024, 5:20 PM'
  },
  {
    id: 3,
    name: 'Add & Remove Users',
    createdDate: '14 Oct 2024, 10:20 AM',
    assignedTo: ['administrator', 'manager']
  },
  {
    id: 4,
    name: 'Project Planning',
    createdDate: '14 Aug 2024, 10:20 AM',
    assignedTo: ['administrator', 'users', 'support']
  },
  {
    id: 5,
    name: 'Manage Email Sequences',
    createdDate: '23 Aug 2024, 2:00 PM',
    assignedTo: ['administrator', 'users', 'support']
  },
  {
    id: 6,
    name: 'Client Communication',
    createdDate: '15 Apr 2024, 11:30 AM',
    assignedTo: ['administrator', 'manager']
  },
  {
    id: 7,
    name: 'Only View',
    createdDate: '04 Dec 2024, 8:15 PM',
    assignedTo: ['administrator', 'restricted-user']
  },
  {
    id: 8,
    name: 'Financial Management',
    createdDate: '25 Feb 2024, 10:30 AM',
    assignedTo: ['administrator', 'manager']
  },
  {
    id: 9,
    name: 'Manage Others’ Tasks',
    createdDate: '04 Nov 2024, 11:45 AM',
    assignedTo: ['administrator', 'support']
  }
]
