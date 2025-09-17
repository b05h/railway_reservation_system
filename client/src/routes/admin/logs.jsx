import { createFileRoute } from '@tanstack/react-router'
import LogsPage from '../../features/admin/session_logs/components/LogsPage'
export const Route = createFileRoute('/admin/logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><LogsPage/></div>
}
