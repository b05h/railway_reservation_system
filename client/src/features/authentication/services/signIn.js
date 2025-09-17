import client from "../../../services/config/axiosClient.js";

// Flag to toggle mock mode
const USE_MOCK = true;

export default async function signIn(data) {
  if (USE_MOCK) {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.email === "j@e.com" && data.password === "123456") {
          resolve({
            id: "user_001",
            name: "Jil Varghese Palliyan",
            email: "j@e.com",
            token: "mockn",
          });
        } else {
          resolve({ error: "Invalid email or password" });
        }
      }, 500); // simulate network delay
    });
  }

  // Real API call
  return (await client.post("/auth/signin", data)).data;
}
