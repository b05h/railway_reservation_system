import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/$bookingId/details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/$bookingId/details"!</div>
}
