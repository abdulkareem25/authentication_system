import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});


function handleRequestError(error) {
  // Network error / server unreachable / request cancelled, etc.
  if (!error.response) {
    throw new Error(
      error.message || "Unable to connect to the server"
    );
  }

  const normalizedError = new Error(
    error.response.data?.message ||
      error.message ||
      "Request failed"
  );

  normalizedError.status = error.response.status;
  normalizedError.data = error.response.data;

  throw normalizedError;
}

export async function loginUser(credentials) {
  try {
    const response = await apiClient.post(
      "/auth/login",
      credentials
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

export async function registerUser(userData) {
  try {
    const response = await apiClient.post(
      "/auth/register",
      userData
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

export async function getMe() {
  try {
    const response = await apiClient.get(
      "/auth/me"
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

export async function logoutUser() {
  try {
    const response = await apiClient.post(
      "/auth/logout"
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

export async function refreshToken() {
  try {
    const response = await apiClient.post(
      "/auth/refresh-token"
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

export async function getDashboardData() {
  try {
    const response = await apiClient.get(
      "/dashboard"
    );

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}