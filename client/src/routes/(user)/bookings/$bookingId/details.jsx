import { createFileRoute } from '@tanstack/react-router';
import BookingDetails from '../../../../features/bookings/components/BookingDetails';

// The key change: explicitly define the full, nested path.
// This tells the router exactly where to find this component.
export const Route = createFileRoute('/(user)/bookings/$bookingId/details')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div><BookingDetails/></div>
}
