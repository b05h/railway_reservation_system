import { useState, useEffect } from "react";
import { getUser, updateUser } from "../services/profileServices";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load mock user data on mount
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      setFormData({ name: data.name, email: data.email, password: "", confirmPassword: "" });
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updated = await updateUser(formData);
      setUser(updated);
      setIsEditing(false);
      setFormData({ name: updated.name, email: updated.email, password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-6">👤 My Profile</h1>

      {!isEditing ? (
        <div className="bg-white shadow rounded-xl p-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Password:</strong> ********</p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-blue-50 shadow rounded-xl p-6 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
