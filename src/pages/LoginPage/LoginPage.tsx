import { useCallback } from "react";
import { FormControlLabel, Input } from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~constants";
import { useAuth } from "~providers";
import { login } from "~services";

import { LOGIN_INITIAL_VALUES, LOGIN_SCHEMA } from "./LoginPage.constants";
import styles from "./LoginPage.module.scss";
import type { LoginFormValues } from "./LoginPage.types";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { onLoginHandler } = useAuth();

  const onSubmitHandler = useCallback(
    async (values: LoginFormValues) => {
      try {
        const { user, ...tokens } = await login(values.email, values.password);
        onLoginHandler(tokens, user);
        void navigate(AppRoute.Dashboard);
      } catch (error) {
        void message.error(
          error instanceof Error ? error.message : "Login failed",
        );
      }
    },
    [navigate, onLoginHandler],
  );

  const { values, errors, onChange, handleSubmit, isDisabled } = useFormik({
    initialValues: LOGIN_INITIAL_VALUES,
    validationSchema: LOGIN_SCHEMA,
    onSubmit: onSubmitHandler,
  });

  const { email, password } = values;
  const { email: emailError, password: passwordError } = errors;

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>Adullam Admin</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormControlLabel label="Email" name="email" layout="vertical">
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={onChange}
              error={emailError}
            />
          </FormControlLabel>

          <FormControlLabel label="Password" name="password" layout="vertical">
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={onChange}
              error={passwordError}
            />
          </FormControlLabel>

          <Button
            type="primary"
            htmlType="submit"
            disabled={isDisabled}
            className={styles.submitButton}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};
