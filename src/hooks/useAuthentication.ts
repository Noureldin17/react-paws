import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { apiRequest } from "../utils/api";
import { User } from "../types/types";

const signIn = async (userData: { email: string; password: string }) => {
  const response = await apiRequest<{ user: User; token: string }>(
    "signin",
    "POST",
    {},
    userData
  );
  return response;
};

const signUp = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await apiRequest<{ user: User; token: string }>("signup", "POST",{}, userData);
  return response;
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      dispatch(login({ user: data.user, token: data.token, loggedIn: true }));
      localStorage.setItem("jwtToken", data.token);
    },
  });
};

export const useSignUp = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      dispatch(login({ user: data.user, token: data.token, loggedIn: true }));
      localStorage.setItem("jwtToken", data.token);
    },
  });
};
