import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-9xl font-bold text-error">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <Link to="/" className="mt-6 btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}
