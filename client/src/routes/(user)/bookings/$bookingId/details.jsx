/*import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/$bookingId/details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/$bookingId/details"!</div>
}*/
/*
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import BookingDetails from "../../../../features/bookings/components/BookingDetails";
import { getBookingById } from "../../../../features/bookings/services/bookingService";

export default function BookingDetailsPage() {
  const { bookingId } = useParams({ from: "/user/bookings/$bookingId/details" });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookingById(bookingId);
        if (!data) {
          throw new Error("Booking not found");
        }
        setBooking(data);
      } catch (err) {
        setError("Failed to fetch booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">Booking not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <BookingDetails booking={booking} />
    </div>
  );
}*/

/*
import { createFileRoute } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import BookingDetails from '../../../../features/bookings/components/BookingDetails';
import { getBookingById } from '../../../../features/bookings/services/bookingService';

// The key change: export a 'Route' piece
export const Route = createFileRoute('/(user)/bookings/$bookingId/details')({
  component: BookingDetailsPage,
});

function BookingDetailsPage() {
  const { bookingId } = useParams({ from: '/user/bookings/$bookingId/details' });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookingById(bookingId);
        if (!data) {
          throw new Error('Booking not found');
        }
        setBooking(data);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">Booking not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <BookingDetails booking={booking} />
    </div>
  );
}*/

// src/routes/(user)/bookings/$bookingId/details.jsx

import { createFileRoute } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import BookingDetails from '../../../../features/bookings/components/BookingDetails';
import { getBookingById } from '../../../../features/bookings/services/bookingService';

// The key change: explicitly define the full, nested path.
// This tells the router exactly where to find this component.
export const Route = createFileRoute('/(user)/bookings/$bookingId/details')({
  component: BookingDetailsPage,
});

function BookingDetailsPage() {
  const { bookingId } = useParams({ from: '/(user)/bookings/$bookingId/details' });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookingById(bookingId);
        if (!data) {
          throw new Error('Booking not found');
        }
        setBooking(data);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-error text-lg font-semibold">Booking not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <BookingDetails booking={booking} />
    </div>
  );
}
