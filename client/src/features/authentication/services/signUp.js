import client from "../../../services/config/axiosClient.js";

export default async function signUp(data) {
  return (await client.post("/auth/signup", data)).data;
}
