import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";


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

export default function TrainSearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(searchSchema) });

  const onSubmit = (data) => {
    if (data.trainNo) {
      // Navigate to train details page
      router.navigate({ to: `/trains/${data.trainNo}/details` });
    } else {
      // Navigate to route search results page with query params
      router.navigate({
        to: `/trains/search`,
        search: { source: data.source, destination: data.destination },
      });
    }
  };

  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-6">Search Train</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Train No */}
          <div>
            <label className="label">
              <span className="label-text">Train Number</span>
            </label>
            <input
              type="text"
              placeholder="Eg: 12623"
              className="input input-bordered w-full"
              {...register("trainNo")}
            />
            {errors.trainNo && (
              <p className="label-text-alt text-error">{errors.trainNo.message}</p>
            )}
          </div>

          <div className="divider">OR</div>

          {/* Source */}
          <div>
            <label className="label">
              <span className="label-text">Source</span>
            </label>
            <input
              type="text"
              placeholder="Eg: Chennai"
              className="input input-bordered w-full"
              {...register("source")}
            />
          </div>

          {/* Destination */}
          <div>
            <label className="label">
              <span className="label-text">Destination</span>
            </label>
            <input
              type="text"
              placeholder="Eg: Bangalore"
              className="input input-bordered w-full"
              {...register("destination")}
            />
          </div>

          {errors.form && (
            <p className="label-text-alt text-error">{errors.form.message}</p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
