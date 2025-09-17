import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/"!</div>
}
