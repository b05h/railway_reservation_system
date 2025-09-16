import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/trains/$trainId/book/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/trains/$trainId/book/new"!</div>
}
