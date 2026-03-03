import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AlertsManagement } from "@/components/alerts/alerts-management"

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <AlertsManagement />
    </DashboardLayout>
  )
}
