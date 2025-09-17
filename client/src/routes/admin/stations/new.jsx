import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/stations/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/stations/new"!</div>
}
