import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/stations/$stationId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/stations/$stationId/edit"!</div>
}
