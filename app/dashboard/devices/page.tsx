import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DeviceManagement } from "@/components/devices/device-management"

export default function DevicesPage() {
  return (
    <DashboardLayout>
      <DeviceManagement />
    </DashboardLayout>
  )
}
