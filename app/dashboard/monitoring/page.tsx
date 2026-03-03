import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { LiveMonitoring } from "@/components/monitoring/live-monitoring"

export default function MonitoringPage() {
  return (
    <DashboardLayout>
      <LiveMonitoring />
    </DashboardLayout>
  )
}
