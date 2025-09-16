// Mock user database
let mockUser = {
  name: "Jil Varghese Palliyan",
  email: "jil@example.com",
  role: "Passenger",
  password: "123456", // stored in mock DB
};

// Get user info
export async function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...mockUser }), 300); // simulate network delay
  });
}

// Update user info
export async function updateUser(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password && data.password !== data.confirmPassword) {
        reject(new Error("Passwords do not match"));
        return;
      }

      mockUser = {
        ...mockUser,
        name: data.name,
        email: data.email,
        password: data.password ? data.password : mockUser.password,
      };

      resolve({ ...mockUser });
    }, 300); // simulate network delay
  });
}
