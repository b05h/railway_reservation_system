import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

const searchSchema = z
  .object({
    trainNo: z.string().optional(),
    source: z.string().optional(),
    destination: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.trainNo && data.trainNo.trim() !== "") ||
      (data.source &&
        data.source.trim() !== "" &&
        data.destination &&
        data.destination.trim() !== ""),
    {
      message: "Enter Train No or Source & Destination",
      path: ["form"], // general error
    }
  );

export default function BookingSearchForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(searchSchema) });

  const onSubmit = (data) => {
    setLoading(true);
    if (data.trainNo) {
      // Navigate to train details page
      router.navigate({ to: `/trains/${data.trainNo}/details` }).finally(() => setLoading(false));
    } else {
      // Navigate to route search results page with query params
      router.navigate({
        to: `/trains/search`,
        search: { source: data.source, destination: data.destination },
      }).finally(() => setLoading(false));
    }
  };

  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100 mx-auto mt-10">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-6">Search Train</h2>
        

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text">Train Number</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 12623"
              className="input input-bordered w-full"
              {...register("trainNo")}
            />
            {errors.trainNo && (
              <p className="label-text-alt text-error">{errors.trainNo.message}</p>
            )}
          </div>

          <div className="divider">OR</div>

          <div>
            <label className="label">
              <span className="label-text">Source</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Chennai"
              className="input input-bordered w-full"
              {...register("source")}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Destination</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Bangalore"
              className="input input-bordered w-full"
              {...register("destination")}
            />
          </div>

          {errors.form && (
            <p className="label-text-alt text-error text-center">{errors.form.message}</p>
          )}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}