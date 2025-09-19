import { Link, createFileRoute } from '@tanstack/react-router';
import BookingList from '../../../features/bookings/components/BookingList';
// The key change: export a 'Route' piece
export const Route = createFileRoute('/(user)/bookings/')({
  component: UserBookingsPage,
});

function UserBookingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
        </div>
        <div>
          <li>
            <Link to="/trains" className="btn btn-primary">Book New Ticket</Link>
          </li>
        </div>
      </div>
      <BookingList/>
    </div>
  );
}
