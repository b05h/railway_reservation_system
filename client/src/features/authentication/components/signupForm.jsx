import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../hooks/useSignUp";

const signupSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export default function SignupForm() {
  const signUp = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    await signUp.resolve(data);
  };

  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="flex flex-col space-y-1">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="label-text-alt text-error">Name is invalid</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="label-text-alt text-error">Email is invalid</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="label-text-alt text-error">Password is invalid</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/signin" className="link link-primary">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
