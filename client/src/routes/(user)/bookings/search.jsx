/*import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/search"!</div>
}*/
/*
import BookingSearchForm from "../../../features/bookings/components/BookingSearchForm";

export default function BookingsSearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Find a Booking</h1>
      <BookingSearchForm />
    </div>
  );
}*/


import { createFileRoute } from '@tanstack/react-router';
import BookingSearchForm from '../../../features/bookings/components/BookingSearchForm';

// The key change: export a 'Route' piece
export const Route = createFileRoute('/(user)/bookings/search')({
  component: BookingsSearchPage,
});

function BookingsSearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Find a Booking</h1>
      <BookingSearchForm />
    </div>
  );
}
