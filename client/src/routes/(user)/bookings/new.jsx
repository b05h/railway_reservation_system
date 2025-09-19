/*import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/bookings/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/bookings/new"!</div>
}*/

/*
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import NewBookingForm from "../../../features/bookings/components/NewBookingForm";
import { getTrainById } from "../../../features/trains/services/trainService";

export default function NewBookingRoute() {
  const { trainId } = useParams({ from: "/trains/$trainId/book/new" });
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrainById(trainId).then((data) => {
      setTrain(data);
      setLoading(false);
    });
  }, [trainId]);

  if (loading) {
    return <p className="text-center p-8">Loading train details...</p>;
  }

  if (!train) {
    return <p className="text-center text-error p-8">Train not found!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <NewBookingForm
        trainId={train.code}
        trainName={train.name}
        source={train.source}
        destination={train.destination}
        scheduleId="12345" // Mock schedule ID
      />
    </div>
  );
}*/

import { createFileRoute } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import NewBookingForm from '../../../features/bookings/components/NewBookingForm';
import { getTrainById } from '../../../features/trains/services/trainService';

// The key change: export a 'Route' piece instead of a default component
export const Route = createFileRoute('/(user)/bookings/new')({
  component: NewBookingRoute,
});

function NewBookingRoute() {
  const { trainId } = useParams({ from: '/trains/$trainId/book/new' });
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrainById(trainId).then((data) => {
      setTrain(data);
      setLoading(false);
    });
  }, [trainId]);

  if (loading) {
    return <p className="text-center p-8">Loading train details...</p>;
  }

  if (!train) {
    return <p className="text-center text-error p-8">Train not found!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <NewBookingForm
        trainId={train.code}
        trainName={train.name}
        source={train.source}
        destination={train.destination}
        scheduleId="12345" // Mock schedule ID
      />
    </div>
  );
}