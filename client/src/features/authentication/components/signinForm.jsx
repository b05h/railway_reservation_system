import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../hooks/useSignIn";

const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default function SigninForm() {
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });

  const onSubmit = async (data) => {
    await signIn.resolve(data);
  };

  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              disabled={signIn.isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="label-text-alt text-error">Email is invalid</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              disabled={signIn.isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="label-text-alt text-error">Password is invalid</p>
            )}
            <label className="label">
              <a
                href="/forgot-password"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          {signIn.isError && (
            <p className="label-text-alt text-error">{signIn.error.title}</p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={signIn.isLoading}
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="link link-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
