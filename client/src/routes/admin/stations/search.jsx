import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/stations/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/stations/search"!</div>
}
