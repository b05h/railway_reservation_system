import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/trains/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/trains/List"!</div>
}
