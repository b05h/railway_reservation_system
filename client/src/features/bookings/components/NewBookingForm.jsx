import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBooking } from "../services/bookingService";
import { useNavigate } from "@tanstack/react-router";

// Define the validation schema for a passenger
const passengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  seat: z.string().min(1, "Seat is required"),
});

// Define the validation schema for the entire form
const newBookingSchema = z.object({
  passengers: z.array(passengerSchema).min(1, "At least one passenger is required"),
});

export default function NewBookingForm({ trainId, trainName, source, destination, scheduleId }) {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(newBookingSchema),
    defaultValues: {
      passengers: [{ name: "", age: "", seat: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const bookingData = {
      userId: "user123", // Replace with actual authenticated user ID
      trainId,
      trainName,
      source,
      destination,
      scheduleId,
      passengers: data.passengers,
      totalAmount: data.passengers.length * 500, // Example calculation
    };

    try {
      const newBooking = await createBooking(bookingData);
      // Navigate to the booking details page upon success
      navigate({ to: `/user/bookings/${newBooking.bookingId}/details` });
    } catch (error) {
      console.error("Booking failed:", error);
      // Handle error, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">New Booking</h2>
          <p className="mb-4">
            Train: <span className="font-semibold">{trainName} ({trainId})</span>
          </p>

          <h3 className="text-xl font-bold">Passenger Details</h3>

          {fields.map((item, index) => (
            <div key={item.id} className="border p-4 rounded-md space-y-4 mb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Passenger {index + 1}</h4>
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-circle">
                    x
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register(`passengers.${index}.name`)}
                  />
                  {errors.passengers?.[index]?.name && (
                    <p className="label-text-alt text-error">{errors.passengers?.[index]?.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    {...register(`passengers.${index}.age`)}
                  />
                  {errors.passengers?.[index]?.age && (
                    <p className="label-text-alt text-error">{errors.passengers?.[index]?.age.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Seat</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register(`passengers.${index}.seat`)}
                  />
                  {errors.passengers?.[index]?.seat && (
                    <p className="label-text-alt text-error">{errors.passengers?.[index]?.seat.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={() => append({ name: "", age: "", seat: "" })} className="btn btn-outline btn-sm">
            Add Another Passenger
          </button>

          {errors.passengers && (
            <p className="text-error mt-4">{errors.passengers.message}</p>
          )}

          <div className="card-actions justify-end mt-6">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}