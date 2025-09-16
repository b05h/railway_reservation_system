import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/trains/$trainId/book')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/trains/$trainId/book"!</div>
}
