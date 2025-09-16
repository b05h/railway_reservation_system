import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/trains/$trainId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/trains/$trainId/edit"!</div>
}
