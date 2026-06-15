import { object, string } from "yup";

import type { LoginFormValues } from "./LoginPage.types";

export const LOGIN_INITIAL_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

export const LOGIN_SCHEMA = object({
  email: string().email("Enter a valid email").required("Email is required"),
  password: string().required("Password is required"),
});
