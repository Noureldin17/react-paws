import { endpointMap } from "./apiConfig";
import { AuthenticationError } from "../utils/errors";

const BASE_URL = 'http://localhost:8080/api/v1';

export const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  params?: Record<string, any>,
  body?: Record<string, any>
): Promise<T> => {
  const isAuthenticated = endpointMap[method]?.[endpoint] ?? true;

  if (isAuthenticated) {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new AuthenticationError("No authentication token found. Please log in.");
    }
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) url.searchParams.append(key, params[key]);
    });
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(isAuthenticated && {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Session expired or unauthorized. Please log in again.");
    }
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const data: T = await response.json().then((json) => json.response);
  
  if (!data) {
    throw new Error("No data returned from API");
  }

  return data;
};
