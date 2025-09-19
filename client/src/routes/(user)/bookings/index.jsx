/*import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/"!</div>
}*/
/*
import { useState } from "react";
import BookingList from "../../../features/bookings/components/BookingList";

export default function UserBookingsPage() {
  const [userId] = useState("user123"); // Mock user ID, replace with authenticated user context

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
      <BookingList userId={userId} />
    </div>
  );
}*/

import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import BookingList from '../../../features/bookings/components/BookingList';

// The key change: export a 'Route' piece
export const Route = createFileRoute('/(user)/bookings/')({
  component: UserBookingsPage,
});

function UserBookingsPage() {
  const [userId] = useState('user123'); // Mock user ID, replace with authenticated user context

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
      <BookingList userId={userId} />
    </div>
  );
}
