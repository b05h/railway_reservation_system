import { createFileRoute } from '@tanstack/react-router'
import RevenuePage from '../../features/admin/revenue/components/RevenuePage'

export const Route = createFileRoute('/admin/revenue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><RevenuePage/></div>
}
