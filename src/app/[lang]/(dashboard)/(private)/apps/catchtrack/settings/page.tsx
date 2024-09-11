// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import AdminSettings from '@views/pages/account-settings'

const PermitTab = dynamic(() => import('@views/apps/catchtrack/admin-settings/account'))
const SecurityTab = dynamic(() => import('@views/apps/catchtrack/admin-settings/security'))
const BillingPlansTab = dynamic(() => import('@views/apps/catchtrack/admin-settings/billing-plans'))
const NotificationsTab = dynamic(() => import('@views/apps/catchtrack/admin-settings/notifications'))
const ConnectionsTab = dynamic(() => import('@views/apps/catchtrack/admin-settings/connections'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  account: <PermitTab />,
  security: <SecurityTab />,
  'billing-plans': <BillingPlansTab />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

const AdminSettingsPage = () => {
  return <AdminSettings tabContentList={tabContentList()} />
}

export default AdminSettingsPage
